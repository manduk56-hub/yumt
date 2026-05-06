$url = "https://xtymdgdnbeukkgwfmgzu.supabase.co/rest/v1/rankings"
$key = "sb_publishable_ixzG850Es4Amfs_32MZSlg_xwx5XKja"
$headers = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
}

Write-Host "Supabase에서 유저 정보를 가져오는 중..."
$users = Invoke-RestMethod -Uri $url -Headers $headers -Method Get

if ($users.Count -eq 0) {
    Write-Host "마이그레이션할 유저가 없습니다."
    exit
}

$adj3 = @("멍청한", "뜨거운", "차가운", "용감한", "귀여운", "날렵한", "커다란", "즐거운", "졸고있는", "배고픈", "배부른", "화가난", "신비로운", "어리숙한")
$noun3 = @("비둘기", "도마뱀", "다람쥐", "개구리", "코끼리", "너구리", "독수리", "펭귄", "팬더", "기린", "하마", "거북이", "고양이", "강아지")
$adj2 = @("멋진", "빠른", "착한", "기쁜", "슬픈", "힘센", "밝은", "푸른", "검은", "맑은", "깊은", "작은")
$noun4 = @("사슴벌레", "스테고사우", "프테라노돈", "아기공룡", "작은새들", "산토끼들", "시골쥐들", "들고양이")

Write-Host "$($users.Count)명의 유저 코드를 새 형식으로 변환합니다..."

foreach ($user in $users) {
    if ((Get-Random -Minimum 0 -Maximum 100) -lt 50) {
        $a = $adj3 | Get-Random
        $n = $noun3 | Get-Random
        $newCode = ($a + $n)
    } else {
        $a = $adj2 | Get-Random
        $n = $noun4 | Get-Random
        $newCode = ($a + $n)
    }
    if ($newCode.Length -gt 6) { $newCode = $newCode.Substring(0, 6) }

    Write-Host "업데이트 중: $($user.name) ($($user.code)) -> $newCode"
    
    # URL 인코딩을 위해 [Uri]::EscapeDataString 사용 (이름에 공백 등이 있을 수 있음)
    $encodedName = [Uri]::EscapeDataString($user.name)
    $encodedId = [Uri]::EscapeDataString($user.student_id)
    $updateUrl = "$url?name=eq.$encodedName&student_id=eq.$encodedId"
    
    $body = @{ code = $newCode } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri $updateUrl -Headers $headers -Method Patch -Body $body -ContentType "application/json"
    } catch {
        Write-Host "실패: $($user.name) 업데이트 중 오류 발생: $_" -ForegroundColor Red
    }
}

Write-Host "마이그레이션이 완료되었습니다!"
