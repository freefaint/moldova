// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFileSync, writeFile, writeFileSync, } from 'fs';
import { resolve } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
async function main({ name, phone, address }: { name: string, phone: string, address: string}) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pentruviata2022@gmail.com", // generated ethereal user
      pass: "6K62jogvYW", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Pentruviata site" <pentruviata2022@gmail.com>', // sender address
    to: "pentruviata@protonmail.com", // list of receivers
    subject: "Pviata member register", // Subject line
    text: `${name} - ${phone}`, // plain text body
    html: `<b>${name}</b><br />${phone}<br /><br />${address}`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

type Data = {
  ok: boolean,
  e?: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, phone, address } = JSON.parse(req.body);
  const data = JSON.parse(readFileSync(resolve(__dirname, '../../../../db/people.json'), 'utf8')) as any[];
  writeFileSync(resolve(__dirname, '../../../../db/people.json'), JSON.stringify([ ...data, { name, phone, address, date: new Date() } ]));
  res.setHeader('Content-Type', 'application/json');
  main({ name, phone, address }).then(() => {
    res.status(200).json({ ok: true });
  }).catch(e => {
    res.status(500).json({ ok: false, e });
  });
}
