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
const callWebhook = async (url: string, data: DATA) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convert the object to JSON string
    };
    try {
        const res = await fetch(url, options);
        if(!res.ok)
            throw new Error('Network response was not ok');
    } catch (error) {
           console.log(error);
           process.exit(1); 
    }
};
export default callWebhook;