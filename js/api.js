// Fonction pour récupérer les données de Google Analytics via l'API
async function fetchGoogleAnalyticsData() {
    const VIEW_ID = 'XXXXXXXXXX'; // Remplace par ton VIEW ID Analytics

    const response = await fetch(`https://www.googleapis.com/analytics/v3/data/ga?ids=ga:${VIEW_ID}&metrics=ga:sessions,ga:pageviews&start-date=7daysAgo&end-date=today`, {
        headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN` // Remplace par ton token
        }
    });

    const data = await response.json();
    displayAnalyticsData(data);
}

// Fonction pour afficher les statistiques dans le backoffice
function displayAnalyticsData(data) {
    const analyticsDiv = document.getElementById("analytics-data");

    if (data.rows) {
        analyticsDiv.innerHTML = `
            <p>Nombre de sessions : ${data.rows[0][0]}</p>
            <p>Nombre de pages vues : ${data.rows[0][1]}</p>
        `;
    } else {
        analyticsDiv.innerHTML = "<p>Impossible de charger les données.</p>";
    }
}

// Exécuter l'appel API une fois la page chargée
document.addEventListener("DOMContentLoaded", fetchGoogleAnalyticsData);
