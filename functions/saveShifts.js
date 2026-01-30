const { neon } = require('@netlify/neon');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    const sql = neon();
    const { shifts } = JSON.parse(event.body);

    try {
        // 假設你的資料表名為 shifts
        for (const [code, { time, color }] of Object.entries(shifts)) {
            await sql`INSERT INTO shifts (code, time, color) VALUES (${code}, ${time}, ${color})`;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Shifts saved successfully' })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving shifts' })
        };
    }
};
