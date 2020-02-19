import { app } from 'server.js';
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);

});