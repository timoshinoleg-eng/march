/**
 * ChatBot24 Studio — Analytics Tracking API
 * Vercel Serverless Function
 * 
 * Tracks events for GA4 and Yandex Metrica
 */

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        const { event, params = {}, clientId } = req.body;

        if (!event) {
            return res.status(400).json({
                success: false,
                message: 'Event name is required'
            });
        }

        // Log event for debugging
        console.log(`[Analytics] Event: ${event}`, params);

        // Here you can implement server-side GA4 tracking
        // const ga4MeasurementId = process.env.GA4_MEASUREMENT_ID;
        // const ga4ApiSecret = process.env.GA4_API_SECRET;
        
        // if (ga4MeasurementId && ga4ApiSecret) {
        //     await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${ga4MeasurementId}&api_secret=${ga4ApiSecret}`, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             client_id: clientId || 'anonymous',
        //             events: [{
        //                 name: event,
        //                 params: params
        //             }]
        //         })
        //     });
        // }

        return res.status(200).json({
            success: true,
            tracked: true
        });

    } catch (error) {
        console.error('Tracking error:', error);
        return res.status(500).json({
            success: false,
            message: 'Tracking failed'
        });
    }
};
