<script>
import axios from 'axios';
import braintree from 'braintree-web';
export default {
    data() {
        return {
            hostedFieldInstance: false,
            nonce: ""
        }
    },
    methods: {
   payWithCreditCard() {
       if(this.hostedFieldInstance)
       {
            this.hostedFieldInstance.tokenize().then(payload => {
                this.nonce = payload.nonce
                axios.post('http://127.0.0.1:8001/api/payment', {
                    nonce: payload.nonce
                })
                .then((response)=> console.log(response))
            })
                .catch(err => {
                    console.error(err);
                })
            }
        }
    },
   mounted() {
       braintree.client.create({
           authorization: "sandbox_cshmcrwd_wbf3cy8nk8xrp2n2"
       })
       .then(clientInstance => {
           let options = {
               client: clientInstance,
               styles: {
                   input: {
                       'font-size': '14px',
                       'font-family': 'Open Sans'
                   }
               },
               fields: {
                   number: {
                       selector: '#creditCardNumber',
                       placeholder: 'Enter Credit Card'
                   },
                   cvv: {
                       selector: '#cvv',
                       placeholder: 'Enter CVV'
                   },
                   expirationDate: {
                       selector: '#expireDate',
                       placeholder: '00 / 0000'
                   }
               }
           }
           return braintree.hostedFields.create(options)
       })
       .then(hostedFieldInstance => {
           // @TODO - Use hostedFieldInstance to send data to Braintree
           this.hostedFieldInstance = hostedFieldInstance;
       })
       .catch(err => {
       });
   }
}
</script>

<template>
    <form>
        <div class="form-group">
            <label>Credit Card Number</label>
            <div id="creditCardNumber" class="form-control"></div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label>Expire Date</label>
                    <div id="expireDate" class="form-control"></div>
                </div>
                <div class="col-6">
                    <label>CVV</label>
                    <div id="cvv" class="form-control"></div>
                </div>
            </div>
        </div>
        <button @click.prevent="payWithCreditCard">
           paga
        </button>
     </form>
     
</template>