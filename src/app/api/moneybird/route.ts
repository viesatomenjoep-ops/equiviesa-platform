import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, phone, description, price, email } = await req.json();

    const MONEYBIRD_API_TOKEN = process.env.MONEYBIRD_API_TOKEN;
    const MONEYBIRD_ADMIN_ID = process.env.MONEYBIRD_ADMIN_ID;

    if (!MONEYBIRD_API_TOKEN || !MONEYBIRD_ADMIN_ID) {
      return NextResponse.json(
        { error: 'Moneybird configuratie ontbreekt in .env (API Token of Admin ID)' },
        { status: 500 }
      );
    }

    const headers = {
      'Authorization': `Bearer ${MONEYBIRD_API_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // 1. Maak een nieuw contact aan (of haal een bestaande op, maar voor nu maken we een nieuwe)
    const contactRes = await fetch(`https://moneybird.com/api/v2/${MONEYBIRD_ADMIN_ID}/contacts.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contact: {
          company_name: name || 'Website Lead (Egaliseren)',
          phone: phone || '',
          email: email || '',
        }
      })
    });

    if (!contactRes.ok) {
      const errorText = await contactRes.text();
      throw new Error(`Fout bij aanmaken contact: ${errorText}`);
    }

    const contactData = await contactRes.json();
    const contactId = contactData.id;

    // 2. Maak een concept offerte (Estimate) of Factuur (Sales Invoice) aan. We maken een offerte (Estimate)
    const estimateRes = await fetch(`https://moneybird.com/api/v2/${MONEYBIRD_ADMIN_ID}/estimates.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        estimate: {
          contact_id: contactId,
          reference: 'Egaliseren.nl Web Aanvraag',
          details_attributes: {
            "0": {
              description: description || 'Egaliseren en voorbehandelen',
              price: price || 0,
              amount: "1",
              tax_rate_id: null // Kan later ingevuld worden (bijv. 21% BTW id)
            }
          }
        }
      })
    });

    if (!estimateRes.ok) {
      const errorText = await estimateRes.text();
      throw new Error(`Fout bij aanmaken offerte: ${errorText}`);
    }

    const estimateData = await estimateRes.json();

    return NextResponse.json({ 
      success: true, 
      contactId, 
      estimateId: estimateData.id,
      message: 'Offerte succesvol als concept aangemaakt in Moneybird!' 
    });

  } catch (error: any) {
    console.error('Moneybird API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
