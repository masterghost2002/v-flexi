type URLSDATA =
    {
        resolution: string;
        url: string | undefined;
    }
type DATA = {
    userId: string;
    videoId: string;
    videoUrls: URLSDATA[]
}
const callWebhook = (url: string, data: DATA) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convert the object to JSON string
    };
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Webhook called')
            process.exit(1);
        })
        .catch(error => {
            console.error('There was a problem with the POST request:', error);
            process.exit(1);
        });
};
export default callWebhook;