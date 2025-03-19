// Fonction pour récupérer les données de Google Analytics 4 (GA4) via l'API
async function fetchGoogleAnalyticsData() {
    const MEASUREMENT_ID = 'G-ZGCPJCVC1F'; // Remplace par ton ID de mesure GA4

    // Remplacer 'YOUR_ACCESS_TOKEN' par ton token d'accès OAuth 2.0
    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${MEASUREMENT_ID}:runReport`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // Remplace par ton token d'accès OAuth 2.0
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "dateRanges": [{"startDate": "7daysAgo", "endDate": "today"}],
            "metrics": [{"name": "sessions"}, {"name": "pageviews"}]
        })
    });

    const data = await response.json();
    displayAnalyticsData(data);
}

// Fonction pour afficher les statistiques dans le backoffice
function displayAnalyticsData(data) {
    const analyticsDiv = document.getElementById("analytics-data");

    // Vérifier si les données existent et afficher les métriques
    if (data.rows && data.rows.length > 0) {
        analyticsDiv.innerHTML = `
            <p><strong>Sessions :</strong> ${data.rows[0].metricValues[0].value}</p>
            <p><strong>Pages vues :</strong> ${data.rows[0].metricValues[1].value}</p>
        `;
    } else {
        analyticsDiv.innerHTML = "<p>Impossible de charger les données.</p>";
    }
}

// Exécuter l'appel API une fois la page chargée
document.addEventListener("DOMContentLoaded", fetchGoogleAnalyticsData);
