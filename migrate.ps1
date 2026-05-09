$url = "https://xtymdgdnbeukkgwfmgzu.supabase.co/rest/v1/rankings"
$key = "sb_publishable_ixzG850Es4Amfs_32MZSlg_xwx5XKja"
$headers = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
    "Content-Type" = "application/json"
}

$alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".ToCharArray()

function New-Code($UsedCodes) {
    for ($attempt = 0; $attempt -lt 100; $attempt++) {
        $chars = for ($i = 0; $i -lt 6; $i++) { $alphabet | Get-Random }
        $code = -join $chars
        if (-not $UsedCodes.Contains($code)) {
            [void]$UsedCodes.Add($code)
            return $code
        }
    }

    throw "Could not generate a unique code after 100 attempts."
}

Write-Host "Fetching users from Supabase..."
$users = Invoke-RestMethod -Uri "$url?select=name,student_id,code" -Headers $headers -Method Get

if ($users.Count -eq 0) {
    Write-Host "No users found to migrate."
    exit 0
}

$studentKeys = @{}
$duplicateStudents = New-Object System.Collections.Generic.HashSet[string]
foreach ($user in $users) {
    $keyValue = "$($user.name)::$($user.student_id)"
    if ($studentKeys.ContainsKey($keyValue)) {
        [void]$duplicateStudents.Add($keyValue)
    }
    $studentKeys[$keyValue] = $true
}

if ($duplicateStudents.Count -gt 0) {
    Write-Host "Duplicate name/student_id rows exist. Clean these before running code migration:" -ForegroundColor Red
    $duplicateStudents | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    exit 1
}

$usedCodes = New-Object System.Collections.Generic.HashSet[string]
$seenCodes = New-Object System.Collections.Generic.HashSet[string]
$duplicateUsers = @()

foreach ($user in $users) {
    if ($user.code) {
        [void]$usedCodes.Add($user.code)
        if ($seenCodes.Contains($user.code)) {
            $duplicateUsers += $user
        } else {
            [void]$seenCodes.Add($user.code)
        }
    }
}

if ($duplicateUsers.Count -eq 0) {
    Write-Host "No duplicate codes found. Nothing to migrate."
    exit 0
}

Write-Host "Found $($duplicateUsers.Count) duplicate row(s). Reassigning only duplicate rows..."

foreach ($user in $duplicateUsers) {
    $newCode = New-Code $usedCodes
    Write-Host "Updating $($user.name) ($($user.student_id)): $($user.code) -> $newCode"

    $encodedName = [Uri]::EscapeDataString($user.name)
    $encodedId = [Uri]::EscapeDataString($user.student_id)
    $updateUrl = "$url?name=eq.$encodedName&student_id=eq.$encodedId"
    $body = @{ code = $newCode } | ConvertTo-Json -Compress

    try {
        Invoke-RestMethod -Uri $updateUrl -Headers $headers -Method Patch -Body $body
    } catch {
        Write-Host "Failed to update $($user.name) ($($user.student_id)): $_" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Migration finished."
