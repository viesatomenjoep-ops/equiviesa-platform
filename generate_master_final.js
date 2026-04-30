const fs = require('fs');

const files = [
    // 1. Foundation: Permissions and initial schema
    'supabase_rbac.sql',
    'supabase/migrations/0001_initial_schema.sql',
    'supabase/migrations/0002_news_schema.sql',
    'supabase/migrations/0003_team_schema.sql',
    'supabase/migrations/0004_horse_documents.sql',
    'supabase/migrations/0005_instagram_references.sql',

    // 2. Base Phase 1 (Equihub / Stable Management)
    'supabase_entergravity_fase1.sql',
    'supabase_equihub_nuclear.sql',

    // 3. Individual Modules (Creates base tables)
    'supabase_appointments.sql',
    'supabase_breeding.sql',
    'supabase_horse_results.sql',
    'supabase_inventory.sql',
    'supabase_quotes.sql',
    'supabase_analytics.sql',
    'supabase_page_builder.sql',

    // 4. Expansions (Alters tables and adds features)
    'supabase_viesa_expansion.sql',
    'supabase_viesa_ultimate.sql',
    'supabase_viesa_breeding.sql',

    // 5. Fixes and Modifiers
    'supabase_update_health_docs.sql',
    'supabase_horses_category.sql',
    'supabase_horses_sort.sql',
    'supabase_roi_fields.sql',
    'update_investors_page.sql',

    // 6. Security overrides (Must be last)
    'supabase_disable_rls.sql',
    'supabase_fix_permissions.sql',
    'supabase_grant.sql'
];

let master = '';
for (const file of files) {
    if (fs.existsSync(file)) {
        master += `-- ==========================================\n`;
        master += `-- FILE: ${file}\n`;
        master += `-- ==========================================\n`;
        master += fs.readFileSync(file, 'utf8') + '\n\n';
    } else {
        console.warn(`Warning: ${file} not found`);
    }
}

fs.writeFileSync('master_schema.sql', master);
console.log('Created updated master_schema.sql v4');
