const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://xtymdgdnbeukkgwfmgzu.supabase.co";
const SUPABASE_KEY = "sb_publishable_ixzG850Es4Amfs_32MZSlg_xwx5XKja";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function generateCode() {
    const adj3 = ["멍청한", "뜨거운", "차가운", "용감한", "귀여운", "날렵한", "커다란", "즐거운", "졸고있는", "배고픈", "배부른", "화가난", "신비로운", "어리숙한"];
    const noun3 = ["비둘기", "도마뱀", "다람쥐", "개구리", "코끼리", "너구리", "독수리", "펭귄", "팬더", "기린", "하마", "거북이", "고양이", "강아지"];
    const adj2 = ["멋진", "빠른", "착한", "기쁜", "슬픈", "힘센", "밝은", "푸른", "검은", "맑은", "깊은", "작은"];
    const noun4 = ["사슴벌레", "스테고사우", "프테라노돈", "아기공룡", "작은새들", "산토끼들", "시골쥐들", "들고양이"];

    if (Math.random() > 0.5) {
        const a = adj3[Math.floor(Math.random() * adj3.length)];
        const n = noun3[Math.floor(Math.random() * noun3.length)];
        return (a + n).substring(0, 6);
    } else {
        const a = adj2[Math.floor(Math.random() * adj2.length)];
        const n = noun4[Math.floor(Math.random() * noun4.length)];
        return (a + n).substring(0, 6);
    }
}

async function migrate() {
    console.log("Fetching users from Supabase...");
    const { data, error } = await supabase.from('rankings').select('*');
    
    if (error) {
        console.error("Error fetching users:", error);
        return;
    }

    if (!data || data.length === 0) {
        console.log("No users found to migrate.");
        return;
    }

    console.log(`Found ${data.length} users. Migrating codes to the new format...`);

    for (const user of data) {
        const newCode = generateCode();
        console.log(`Updating ${user.name}: ${user.code} -> ${newCode}`);
        
        const { error: updateError } = await supabase
            .from('rankings')
            .update({ code: newCode })
            .match({ name: user.name, student_id: user.student_id });

        if (updateError) {
            console.error(`Failed to update ${user.name}:`, updateError);
        }
    }

    console.log("Migration finished.");
}

migrate();
