const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey:
    "xnd_development_kjw7zafVUEkPFwp0BNURu7vEGq4zkOGfHhoy1WKilU4lBe8RUTvz4Et2naKvf",
});

const { Invoice } = x;
const invoice = new Invoice({});
class XenditInvoice {
  static createInvoice(externalID, amount, customer) {
    return invoice.createInvoice({
      externalID: externalID,
      amount,
      payerEmail: customer.email,
    });
  }
  // static expireInvoice(invoiceID) {
  //   return invoice.expireInvoice({ invoiceID });
  // }
  // static getInvoice(invoiceID) {
  //   return invoice.getInvoice({ invoiceID });
  // }
}
module.exports = XenditInvoice;
