require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const email = 'info@equiviesa.com'; // Auto-corrected from equivisa.com based on domain
  const password = 'viesa 11';

  console.log(`Creating user ${email}...`);
  
  // 1. Create Auth User
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
        console.log("User already registered in auth, updating password just in case...");
        const { data: listData } = await supabase.auth.admin.listUsers();
        const user = listData.users.find(u => u.email === email);
        if (user) {
             await supabase.auth.admin.updateUserById(user.id, { password: password, email_confirm: true });
             console.log("Password updated.");
        }
    } else {
        console.error("Error creating auth user:", authError.message);
        return;
    }
  } else {
      console.log("Auth user created successfully.");
  }

  // 2. Add to admin_permissions table
  console.log("Adding user to admin_permissions...");
  const { data: permData, error: permError } = await supabase
    .from('admin_permissions')
    .upsert(
      { 
        email: email, 
        role: 'Owner', 
        permissions: { all: true } 
      },
      { onConflict: 'email' }
    );

  if (permError) {
    console.error("Error adding to admin_permissions:", permError.message);
  } else {
    console.log("Successfully added to admin_permissions table.");
  }
}

createAdminUser();
