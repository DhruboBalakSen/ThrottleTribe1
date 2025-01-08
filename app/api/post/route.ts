export default function handler(req:any, res:any) {
    if (req.method === 'GET') {
      // Handle GET request
      res.status(200).json({ message: 'This is a GET request' });
    } else {
      // Handle other HTTP methods
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }