let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = 7000;
let Stripe = require('stripe');
let stripeKey = 'sk_test_51Q7IJDCp4HDJPhgQ6cheCqo3UTLNmEHdIiUS28rsvElvUcKel7QE7dzTTkEZ3O1wGMu7dndvVIyQUx320cUCYraO00VwlArqxV';
app.use(bodyParser.json());
app.use(cors());

app.post('/create-checkout-session', async(req, res) => {
    let stripe = Stripe(stripeKey);
    const cart = req.body?.data;
    console.log('Cartitemes',cart);
    const lineItems = cart.map((cItem) => {
        return{
            price_data: {
                currency: 'GBP',
                product_data: {
                    name: cItem.itemName
                },
                unit_amount: cItem.price * 100
            },
            quantity: cItem.quantity,
        };
    });
    try {
        // create stripe session
        let session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${'http://localhost:4200'}/stripe-successful-payment?hash=hash`,
            cancel_url: `${'http://localhost:4200'}/stripe-cancelled-payment?hash=hash`,
            expand: ['payment_intent']
        });
        return res.send(session)
    } catch (error) {
        console.log(error);
    }
})
app.listen(port, () => console.log(`Listen port ${ port }!`))