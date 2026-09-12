import React, { useState, useEffect } from 'react';
import { InsuranceCardData } from '../types';
import { Mail, Copy, Check, Download, ExternalLink, X, FileText, Send, Image as ImageIcon } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InsuranceCardData;
  onDownloadPdf: () => void;
  onCopyImage: () => Promise<boolean>;
  isGenerating: boolean;
  onGenerateAttachment?: () => Promise<string | null>;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  data,
  onDownloadPdf,
  onCopyImage,
  isGenerating,
  onGenerateAttachment,
}) => {
  const [recipientEmail, setRecipientEmail] = useState('cjbuck991@gmail.com');
  const [activeTab, setActiveTab] = useState<'email1' | 'email2' | 'email3' | 'pdf'>('email1');
  const [copiedImage, setCopiedImage] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [sendingStep, setSendingStep] = useState<string>('');

  useEffect(() => {
    if (activeTab === 'pdf' && !pdfPreviewUrl && onGenerateAttachment) {
      setIsGeneratingPdf(true);
      onGenerateAttachment().then(url => {
        setPdfPreviewUrl(url);
        setIsGeneratingPdf(false);
      });
    }
  }, [activeTab, onGenerateAttachment, pdfPreviewUrl]);

  if (!isOpen) return null;

  // Template 1: TD Insurance Portal Notification (HTML)
  const tdPolicySuffix = data.policyNumber ? data.policyNumber.slice(-4) : '5039';
  const tdInsuredName = data.insuredName.split(' ')[0] || 'Michael';

  const tdHtmlTemplate = `
<div style="background-color:#f5f5f5; padding: 20px 0; font-family: Arial, sans-serif;">
<table width="600" cellspacing="0" cellpadding="0" style="padding:0;border-collapse:collapse;background:#ffffff;opacity:1;margin:0 auto!important;max-width:600px;width:100%">
<tbody>
<tr>
<td>
<table width="600" align="center" style="background-color:#f5f5f5;width:100%">
<tbody>
<tr>
<td style="text-align:left;color:#555555;font-size:12px;font-family:'Arial';padding:20px;line-height:16px;word-break:break-word">
To make sure our emails get to you, please add <a style="color:#1a5336;text-decoration:underline">
Infoclient.west@melochemonnex.com</a> to your address book. </td>
</tr>
</tbody>
</table>
<table style="margin:0 auto;border-collapse:collapse;vertical-align:middle;height:48px;width:100%">
<tbody>
<tr style="background-color:#1a5336">
<td style="text-align:left;vertical-align:middle;width:37px"><img src="https://ci3.googleusercontent.com/meips/ADKq_NaJNtCxZkfhKqnEM_9jkuJFc2KFoD_Cc7TCzqxCwGp4lyEMUTkLGwqtIqhclAq9_a4oc4yiqj9ZnFce2j657-9EKMnaP6MjURE-jlac7tr0JKPjvw=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/da/assets/td_logo.png" alt="TD Logo" width="37" height="32" style="border:0;padding-top:8px;padding-bottom:8px;padding-left:10px" class="CToWUd" data-bit="iit">
</td>
<td style="margin:0;padding:0;font-family:'Arial','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;height:48px;text-align:center;font-weight:bold;font-size:16px;color:#ffffff;vertical-align:middle">
TD Insurance Meloche Monnex </td>
<td style="width:47px"></td>
</tr>
</tbody>
</table>
<table align="center" style="padding-bottom:10px">
<tbody>
<tr>
<td>
<table align="center" style="padding-top:40px;font-family:'Arial','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif">
<tbody>
<tr>
<td>
<div>
<table align="center" style="padding-bottom:20px">
<tbody>
<tr>
<td style="color:#1a5336;font-size:29px;line-height:36px;font-family:'Arial'">
Dear ${tdInsuredName}, </td>
</tr>
</tbody>
</table>
<table>
<tbody>
<tr>
<td style="padding-bottom:25px!important; color:#333333; font-size:14px; line-height:20px;">Thank you for choosing TD Insurance for your coverage needs.
<b>New documents will be available for your review</b> on the MyInsurance portal within 24 hours. Please login to review these documents related to your
<b>auto insurance policy ending with ext. ${tdPolicySuffix}.</b> </td>
</tr>
<tr>
<td style="padding-top:30px;padding-bottom:15px;padding-left:15px;padding-right:15px;text-align:center;font-size:18px;line-height:28px;color:#1c1c1c;border-collapse:collapse;width:100%;border-top:1px #cccccc solid;height:1px;margin:0">
<b>View and manage your documents on MyInsurance now!</b> <br>
Not registered yet? <br>
<b>Do it in just a few clicks!</b> </td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
<table align="center" style="width:100%">
<tbody>
<tr>
<td align="center" style="margin-left:14px;margin-right:14px;padding:10px 20px;display:block;clear:both;word-break:break-word;background-color:#c55415;text-align:center;vertical-align:middle;border-radius:5px;height:50%">
<a href="https://www.tdinsurance.com/my-policies" style="text-decoration:none;color:#ffffff;text-align:center;vertical-align:middle;font-family:Arial;font-size:17px;line-height:20px" target="_blank">tdinsurance.com/myinsurance&nbsp;
 &nbsp;</a> </td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" style="padding-bottom:20px;padding-top:30px">
<tbody>
<tr>
<td>
<table align="center" style="font-family:'Arial','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif">
<tbody>
<tr>
<td>
<div>
<table>
<tbody>
<tr>
<td style="padding-bottom:25px!important; color:#333333; font-size:14px; line-height:20px;">Remember that when your policy is on the paperless option, we will not mail your documents. Some documents may still be mailed to you, namely, to satisfy regulatory requirements or because we deem
 them necessary to mail. Please note that all automobile liability cards (pink cards) will be sent by mail.
</td>
</tr>
<tr>
<td style="border-collapse:collapse;width:100%;border-top:1px #cccccc solid;height:1px;margin:0;padding-top:30px; color:#333333; font-size:14px; line-height:20px;">
Thanks again for entrusting us with your insurance needs. For more details log in to MyInsurance or call us at
<b><a href="tel:(800)%20268-8955" style="color:#1a5336; text-decoration:none;">1-800-268-8955</a></b> with any questions you may have. </td>
</tr>
<tr>
<td style="padding-top:10px; color:#666666; font-size:12px;"><b>Disclaimer:</b> If your documents are not available on the MyInsurance portal within 24 hours, please contact us at the above number.
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table width="600" style="background-color:#1a5336;border-collapse:collapse;width:100%;clear:both;border-top:3px #34b233 solid;height:3px;margin:0">
<tbody>
<tr>
<td align="center" style="margin:0 auto;display:block;clear:both">
<table align="center" style="font-size:14px;color:#ffffff;line-height:20px;text-align:center;padding:0;margin:0;font-family:'Arial','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;border-collapse:collapse">
<tbody>
<tr>
<td><img alt="Chair" src="https://ci3.googleusercontent.com/meips/ADKq_NYo7o_DOCTgBeGwtc5CIcHHCNk0pEIZcCYAXs0YdPQknJPnNW2c8gz2IOH-KXX0xfvVOmbieI9lLf21FQTTM90iQPpEjSEIGIV-ptL2LUZEZi8zENVj8c2cWwc=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/da/assets/td-green-chair.png" width="124" height="125" class="CToWUd" data-bit="iit"></td>
<td align="left" style="color:#ffffff; font-size:13px; font-family:Arial;">
<a href="https://www.tdinsurance.com/customer-service/contact-us" style="text-decoration:underline;color:#ffffff;padding:0 3px" target="_blank">Contact Us</a> |
<a href="https://www.td.com/privacy-and-security/privacy-and-security/index.jsp" style="text-decoration:underline;color:#ffffff;padding:0 3px" target="_blank">
Privacy and Security</a> | <a href="https://www.tdinsurance.com/legal" style="text-decoration:underline;color:#ffffff;padding:0 3px" target="_blank">
Legal</a> <br>
<br>
All rights reserved. </td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>`.trim();

  // Template 2: Registration Portal (HTML)
  const tdRegistrationHtmlTemplate = `
<center role="article" lang="en" style="width:100%;background-color:#f5f5f5">
<span style="display:none">Create a MyInsurance account to access your policy documents.</span>
<div style="max-width:600px;margin:0 auto">
<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:auto">
<tbody>
<tr>
<td style="padding-top:13px">
<table bgcolor="#FFFFFF" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
<tbody>
<tr bgcolor="#FFFFFF">
<td align="center" valign="top" style="padding:20px;border-top:10px solid #43b02a;border-bottom:1px solid #cccccc">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
<tbody>
<tr bgcolor="#FFFFFF">
<td align="left" valign="middle" width="67" style="padding-right:23px"><img alt="TD" border="0" height="60" src="https://ci3.googleusercontent.com/meips/ADKq_Nb0SDTJMdOwwMHNZOOnhUiTYBG6-5TvsCf_eHTH8OElFiYf0H67_S6T6sbfGju94oDJ9uyrrzvOEruZE7dJizAWG43ivlcNlFi3xja-byKyM1gLyS6Eh3pSKc8TtC4sMtlIe-3z7EKS-oFOZw=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/notificationimages/assets/td-shield-st-v1.png" width="67" style="display:block;max-width:67px!important" class="CToWUd" data-bit="iit">
</td>
<td align="right" valign="top"><img alt="TD Insurance" border="0" src="https://ci3.googleusercontent.com/meips/ADKq_NaM1rJNdQlZzyJiiKTUhCYg6I5iwrIDXWqBcfkZuNfTS5cqCAxKUYLjrM_Kk0nAstulgij6xN_f91szTcXmnfhKvIrByipATIV6C0dky2mua-VSqtp4p0yXmaLfVOfw2aRb-9C5rV47xy-orppptzaw1g=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/notificationimages/assets/tdi-wordmark-st-v1-en.png" width="140" style="display:block;width:140px" class="CToWUd" data-bit="iit">
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="background-color:#ffffff">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
<tbody>
<tr>
<td style="font-family:Arial,Verdana,Tahoma,sans-serif;font-size:15px;line-height:20px;color:#1c1c1c">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
<tbody>
<tr bgcolor="#FFFFFF">
<td align="center" valign="middle" width="200"><img alt="" border="0" height="90" src="https://ci3.googleusercontent.com/meips/ADKq_NZewgC_NehDHPUAW4S7eKg7X-c3dOIdV1s7mCGmd12fHTa-u2mGEhaOX1oEpyIh4XhWjT4JecVpL9SWtTpRCtHSNxAbDqX_1zgS1SRXAluJq3NfPOpjv8NxuX3KiRNpI1VkzWxBh-tV5Nj71igJhrJ1FCCXuYYRxsgQ1IRzY6fVokJkjz4=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/notificationimages/assets/basicInsuranceCoverage-smp-200x90-hybrid.png" width="200" style="display:block;max-width:200px!important" class="CToWUd" data-bit="iit">
</td>
</tr>
<tr>
<td align="center">
<h1 style="color:#1a5336;margin-bottom:20px;font-size:26px;font-weight:700;line-height:36px;text-align:center;max-width:400px">
<b>Have you registered for MyInsurance?</b> </h1>
</td>
</tr>
<tr>
<td style="padding-bottom:16px;font-family:Arial,Verdana,Tahoma,sans-serif;line-height:24px;font-weight:400;font-size:16px">
Hi ${tdInsuredName},</td>
</tr>
<tr>
<td style="padding-bottom:16px;font-family:Arial,Verdana,Tahoma,sans-serif;line-height:24px;font-weight:400;font-size:16px">
Your document delivery preference is set to Paperless for your auto insurance policy ending in # ${tdPolicySuffix}. That means that you agree to receive your insurance documents electronically through MyInsurance, our secure online service.</td>
</tr>
<tr>
<td style="padding-bottom:16px;font-family:Arial,Verdana,Tahoma,sans-serif;line-height:24px;font-weight:400;font-size:16px">
<b>Your pink (liability) card(s) will continue to be sent by mail</b> – however, you'll receive most of your policy documents electronically. We'll send a notification to the email address that you provided to us whenever new documents are available on MyInsurance.</td>
</tr>
</tbody>
</table>
<table width="100%" align="center">
<tbody>
<tr bgcolor="F9FCF4">
<td style="background-color:#f9f9f9;font-family:Arial,Verdana,Tahoma,sans-serif;padding-top:24px;padding-left:16px;padding-right:16px;font-size:16px;line-height:28px;text-align:center;font-weight:700">
Already registered? </td>
</tr>
<tr>
<td style="background-color:#f9f9f9;padding-left:16px;padding-right:16px;text-align:center;padding-bottom:28px;font-weight:400;font-size:16px">
Thank you! No further action is required. </td>
</tr>
</tbody>
</table>
<table>
<tbody>
<tr>
<td align="center">
<h2 style="font-family:Arial,Verdana,Tahoma,sans-serif;font-size:22px;line-height:32px;width:100%;font-weight:700;margin-top:28px;padding-bottom:20px;text-align:center;color:#1a5336;max-width:400px">
Reminder: Set up your MyInsurance account to access&nbsp;your&nbsp;documents</h2>
</td>
</tr>
<tr>
<td style="font-family:Arial,Verdana,Tahoma,sans-serif;font-size:16px;line-height:24px;width:100%;font-weight:400;padding-bottom:8px;margin-top:20px">
Create your MyInsurance account to view, save, and print your online policy documents, 24/7. Here's how</td>
</tr>
<tr>
<td style="font-family:Arial,Verdana,Tahoma,sans-serif;font-size:16px;line-height:24px;width:100%;padding-bottom:20px">
<ol>
<li style="margin-bottom:8px">Click the <b>Get Started</b> button below.</li><li style="margin-bottom:8px">Choose to create a new MyInsurance username and password, or use your existing TD EasyWeb or WebBroker login (if you have one).</li><li>Review the terms and conditions and click <b>Agree</b> to begin using your MyInsurance account.</li></ol>
</td>
</tr>
</tbody>
</table>
<table align="center" style="max-width:600px!important;margin:auto">
<tbody>
<tr style="background-color:#ffffff">
<td style="width:100%;max-width:600px">
<center><a href="https://myinsurance.td.com/customer-registration/overview?dipssGuid=4253dbdf-03ca-4698-95dc-3c5acb411950" style="background-color:#ff9500;color:#1c1c1c;display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;line-height:40px;text-align:center;text-decoration:none;width:250px" target="_blank">Get
 Started</a> </center>
</td>
</tr>
</tbody>
</table>
<table style="width:100%">
<tbody>
<tr>
<td style="padding-bottom:28px;padding-top:28px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" align="center">
<tbody>
<tr>
<td style="border-bottom:#cccccc 1px solid"></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table style="width:100%">
<tbody>
<tr>
<td>
<h2 style="text-align:center;font-family:Arial;font-size:22px;line-height:36px;text-align:center;color:#1a5336;max-width:100%;margin-bottom:0px;width:400px;margin:auto;padding-top:0px;margin-top:0px;padding-bottom:20px">
<b>Questions? Let us help!</b></h2>
</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:16px;line-height:24px;color:#1c1c1c;text-align:left;padding-bottom:16px;margin-top:20px">
Learn more about Paperless using the methods below </td>
</tr>
</tbody>
</table>
<table align="center">
<tbody>
<tr>
<td style="vertical-align:top;padding-top:10px"><img src="https://ci3.googleusercontent.com/meips/ADKq_NYwmpJ4WoGCyIjgl-L6Qw8EnbiZ2EP_dG2POo7CN9avP6hsUEpOKyhls3wmGzYjKETj8KQN5OQoqJXDw0EiuNaeAStiz70eH3hIO2CCjT7hl8_Pbpn6K2Fm4xTkBicZevps6m-Afbw65IYsGWt3vDhJZwbzaKIuGHqDgSNP=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/notificationimages/assets/TDInsuranceApp2-smp-80x80-hybrid.png" width="80" alt="" style="display:block;width:80px" class="CToWUd" data-bit="iit">
</td>
<td valign="top" style="width:480px;vertical-align:top;font-size:16px;line-height:24px;font-family:Arial,Verdana,Tahoma,sans-serif;font-weight:400">
<p style="padding-bottom:0px;margin-bottom:0px;margin-left:20px"><b>Log in to MyInsurance</b> and visit the Support Page to get answers to Frequently Asked Questions.</p>
</td>
</tr>
<tr>
<td style="vertical-align:top;padding-top:20px"><img src="https://ci3.googleusercontent.com/meips/ADKq_NaPHQHIWg6MxTl8ALGcaETFVnhRJfstNz0yAj1-ZFybGYi7E3Dq55Zoba2_LWXe1adV0XPXBJG5fCzyvBadm9s-uQTCYWPm3b0V3SBorVTv3EQ88TN6YmnespBcMNlZjfWiQKO3zZ5-XH5dDa49Z7umDUjgvXkmFw-jSw=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/notificationimages/assets/callAdvisor02-smp-80x80-hybrid.png" width="80" alt="" style="display:block;width:80px" class="CToWUd" data-bit="iit">
</td>
<td valign="top" style="width:420px;vertical-align:top;font-size:16px;line-height:24px;font-family:Arial,Verdana,Tahoma,sans-serif;font-weight:400;padding-top:10px">
<p style="padding-bottom:0px;margin-bottom:0;margin-left:20px"><b>Click the chat icon</b> while logged in to MyInsurance to chat with one of our trusted chat advisors online.
</p>
</td>
</tr>
<tr>
<td style="vertical-align:top;padding-top:20px"><img src="https://ci3.googleusercontent.com/meips/ADKq_NZf5hxy1oBmHD10RnbsCLOGu3hl8_yZDKuJ06cFP7nevNqhTarkqEHwBEq0cAaaj-PCJ2rEokSLGaydwzYvXWU8bImcrHo5YfexFp_D00xiC_McrIs4fC1LUOimUgCu0S7tosY00RmL6RKKnvyyWneSN0cWVk8rK6BtcbhVoQZ9wlAu=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/notificationimages/assets/phoneWithSpeechBubble-smp-80x80-hybrid.png" width="80" alt="img" style="display:block;width:80px" class="CToWUd" data-bit="iit">
</td>
<td valign="top" style="width:420px;vertical-align:top;font-size:16px;line-height:24px;font-family:Arial,Verdana,Tahoma,sans-serif;font-weight:400;padding-top:10px">
<p style="padding-bottom:0px;margin-bottom:0;margin-left:20px"><b>Call us at</b>
<a href="tel:1-800-268-8955" style="color:#038203;text-decoration:underline" target="_blank">1-800-268-8955</a> Monday to Friday, from 8:00 a.m. – 8:00 p.m. and Saturday from 9:00 a.m. – 4:00 p.m.</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr bgcolor="#F9F9F9">
<td>
<table bgcolor="#F9F9F9" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:auto;border-top:4px solid #1a5336">
<tbody>
<tr bgcolor="#F9F9F9">
<td align="center" valign="top">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:auto">
<tbody>
<tr bgcolor="#F9F9F9">
<td align="center" valign="middle"><img alt="" border="0" src="https://ci3.googleusercontent.com/meips/ADKq_Na7vcpL_adkPcApKDX6dwSS5C0WqLwT0YOD1m-nnvm5Dwh_p3XCaac5k7hnkQ7kFfsDupBszyt9k6ws5DTtUUNri4OX6Smni0Jm2D5f_EI4GWyawRsfwpx0a0aI7L-GdkITqIPyTsAY9kyh=s0-d-e1-ft#https://www.feeds.td.com/ew//images/omni/notificationimages/assets/td-chair-st-v1.png" width="124" style="display:block;max-width:124px!important;margin-left:auto!important;margin-right:auto!important;min-width:124px" class="CToWUd" data-bit="iit"></td>
<td valign="middle" style="font-size:15px;line-height:20px;border-collapse:collapse;background-color:#f9f9f9;color:#616161;font-family:Arial,Verdana,Tahoma,sans-serif;text-align:left">
<span style="white-space:nowrap"><a href="https://www.tdinsurance.com/customer-service/contact-us/" style="color:#616161;text-decoration:underline;background-color:#f9f9f9" target="_blank">Contact&nbsp;Us</a>
 &nbsp;|&nbsp;</span> <a href="https://www.tdinsurance.com/legal" style="color:#616161;text-decoration:underline;background-color:#f9f9f9" target="_blank">
Legal</a> &nbsp;|&nbsp; <a href="https://www.tdinsurance.com/customer-service/accessibility" style="color:#616161;text-decoration:underline;background-color:#f9f9f9" target="_blank">
Accessibility</a> &nbsp;|&nbsp; <a href="https://www.tdinsurance.com/about-us" style="color:#616161;text-decoration:underline;background-color:#f9f9f9" target="_blank">
Our&nbsp;Companies</a> &nbsp;|&nbsp; <a href="https://www.td.com/ca/en/about-td/privacy-and-security/tdi-index" style="color:#616161;text-decoration:underline;background-color:#f9f9f9" target="_blank">
Privacy&nbsp;and&nbsp;Security</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table width="100%">
<tbody>
<tr bgcolor="#F5F5F5">
<td align="left" valign="top" style="color:#555555;font-family:Arial,Verdana,Tahoma,sans-serif;font-size:13px;line-height:20px;padding-top:20px">
Please do not reply to this email — this mailbox is not monitored. </td>
</tr>
<tr>
<td align="left" valign="top" style="font-family:Arial,Verdana,Tahoma,sans-serif;font-size:13px;line-height:20px;color:#555555;padding-top:11px">
You have received this email at <a href="mailto:\${recipientEmail || 'client@example.com'}" style="color:#038203;text-decoration:underline" target="_blank">
\${recipientEmail || 'client@example.com'}</a> because you have a TD Insurance or TD Insurance Meloche Monnex policy underwritten by TD General Insurance Company or TD Home and Auto Insurance Company or Primmum Insurance Company or Security National Insurance Company.</td>
</tr>
<tr>
<td align="left" valign="top" style="font-family:Arial,Verdana,Tahoma,sans-serif;font-size:13px;line-height:20px;color:#555555;padding-top:11px">
Safeguarding our customers' information is a fundamental principle of TD Bank Group. For security reasons, certain information including account number has been masked. TD will not ask you to provide personal information or login information, such as username,
 passwords, PINs, IdentificationPlus<sup>®</sup> security questions and answers or account numbers, through unsolicited email. TD will not share sensitive data through regular email nor will TD request this type of information be sent from you through regular
 email. If you suspect an email to be fraudulent, please forward a copy to us at <a href="mailto:phishing@td.com" style="color:#038203;text-decoration:underline" target="_blank">
phishing@td.com</a> and then delete the email.</td>
</tr>
<tr>
<td align="left" style="font-size:13px;line-height:20px;color:#555555;font-family:Arial,Verdana,Tahoma,sans-serif;padding-top:11px;padding-bottom:30px">
<sup>®</sup> The TD logo and other TD trademarks are the property of the Toronto‑Dominion Bank or its subsidiaries.</td>
</tr>
</tbody>
</table>
</div>
</center>
`.trim();

  // Template 3: Document Delivery (HTML with Attachment)
  const tdDeliverySubject = `Insurance Documents Requested - Policy #${data.policyNumber || '00157475039'}`;
  const tdDeliveryHtmlTemplate = `
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; padding: 20px; background-color: #ffffff;">
<pre style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333333; white-space: pre-wrap; line-height: 1.6; margin: 0;">Dear Valued Customer,
 
Thank you for contacting us regarding your current insurance needs. We value your business and are committed to making your insurance experience comfortable. For your convenience we have attached the information you requested to this email. To view the attachment, please open using Acrobat Reader tool (minimum version 7.0). If you do not have this tool you can download it here <a href="http://www.adobe.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.adobe.com&amp;source=gmail&amp;ust=1789267156460000&amp;usg=AOvVaw2DR1-9MY2JBQeZIXVcuj_n" style="color:#008a00;text-decoration:underline;">http://www.adobe.com</a>.  
 
We're here to help! If you have any questions or would like additional information please contact us at the number provided in the attached document. We look forward to serving you in the future.

In case of discrepancy, our records regarding your policy and coverages are conclusive evidence and prevail.

Thank you,
TD Insurance
</pre>
</div>`.trim();

  const handleCopyImageToClipboard = async () => {
    const success = await onCopyImage();
    if (success) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2500);
    }
  };

  const sendEmailRequest = async (payload: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    attachments?: Array<{ filename: string; content: string; encoding: string; contentType: string }>;
  }) => {
    let res: Response;
    try {
      res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });
    } catch (networkErr: any) {
      throw new Error(`Network connection error: ${networkErr.message || 'Could not connect to backend server'}`);
    }

    const responseText = await res.text();
    let data: any = {};
    try {
      data = JSON.parse(responseText);
    } catch {
      // If server returned HTML (e.g. 502/504 gateway or proxy error)
      const cleanSnippet = responseText.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim().slice(0, 180);
      throw new Error(cleanSnippet || `Server returned HTTP ${res.status} ${res.statusText}`);
    }

    if (!res.ok || data.success === false) {
      throw new Error(data.error || data.details || `Server returned status ${res.status}`);
    }

    return data;
  };

  const handleSendSequence = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      setSendError('Please enter a valid recipient email address.');
      return;
    }
    
    setIsSending(true);
    setSendError(null);
    setSendSuccess(false);
    setSendingStep('Generating PDF attachment...');

    try {
      // Setup PDF attachment for Email 3
      let base64Data: string | null = null;
      let pdfUrl = pdfPreviewUrl;
      
      if (!pdfUrl && onGenerateAttachment) {
        pdfUrl = await onGenerateAttachment();
      }

      if (pdfUrl) {
         base64Data = pdfUrl.split(',')[1];
      }

      const attachments = base64Data ? [{
        filename: `Temporary Automobile Liability Insurance Card.pdf`,
        content: base64Data,
        encoding: 'base64',
        contentType: 'application/pdf'
      }] : undefined;

      // 1. Send Email 1 (TD Portal HTML Notification)
      setSendingStep('Sending Email 1 of 3 (TD Portal Notification)...');
      await sendEmailRequest({
        to: recipientEmail,
        subject: 'New insurance documents will be ready for you in MyInsurance within 24 hours',
        html: tdHtmlTemplate,
      });

      // 2. Send Email 2 (Registration HTML Notice)
      setSendingStep('Sending Email 2 of 3 (Registration Notice)...');
      await sendEmailRequest({
        to: recipientEmail,
        subject: 'Action Required: Set up your MyInsurance account to access your documents',
        html: tdRegistrationHtmlTemplate,
      });

      // 3. Send Email 3 (Document Delivery HTML with PDF Attachment)
      setSendingStep('Sending Email 3 of 3 (Document Delivery + PDF Attachment)...');
      await sendEmailRequest({
        to: recipientEmail,
        subject: tdDeliverySubject,
        html: tdDeliveryHtmlTemplate,
        attachments: attachments,
      });

      setSendSuccess(true);
      setSendingStep('');
      setTimeout(() => setSendSuccess(false), 5000);
    } catch (err: any) {
      console.error('Email dispatch sequence failed:', err);
      setSendError(err.message || 'SMTP sending error occurred.');
    } finally {
      setIsSending(false);
      setSendingStep('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-4xl w-full overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Email Sequence Delivery</h2>
              <p className="text-sm text-gray-500 font-medium">Review and dispatch the 3-step email sequence.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50/50 flex flex-col">
          <div className="p-6 space-y-6">
            
            {/* Recipient & Action */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-xl focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-hidden font-medium text-gray-900"
                />
              </div>
              <div className="flex-1 w-full">
                <p className="text-xs text-gray-500 mb-1.5 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Sequence: 3 Emails (Portal, Registration, Document Delivery with PDF)
                </p>
                <button
                  type="button"
                  onClick={handleSendSequence}
                  disabled={isSending || !recipientEmail}
                  className="w-full flex justify-center items-center gap-2 px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-md shadow-pink-600/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? (sendingStep || 'Sending Email Sequence...') : 'Send Email Sequence (3 Emails)'}</span>
                </button>
              </div>
            </div>
            
            {/* Status Messages */}
            {sendError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-medium space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <X className="w-4 h-4 text-red-600" />
                  SMTP Delivery Error
                </div>
                <div className="text-xs font-mono bg-red-100/70 p-2 rounded text-red-900 break-words">
                  {sendError}
                </div>
                <div className="text-[11px] text-red-600 pt-1">
                  Tip: Verify SMTP host, port, and authentication credentials in your project environment settings.
                </div>
              </div>
            )}
            {sendSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> 
                <span>Successfully dispatched all 3 emails in sequence to {recipientEmail}!</span>
              </div>
            )}

            {/* Previews */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50/80">
                <button
                  onClick={() => setActiveTab('email1')}
                  className={`flex-1 py-3 px-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'email1' 
                      ? 'bg-white border-b-2 border-pink-600 text-pink-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-b-2 border-transparent'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 hidden sm:block" />
                  1: Portal
                </button>
                <button
                  onClick={() => setActiveTab('email2')}
                  className={`flex-1 py-3 px-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'email2' 
                      ? 'bg-white border-b-2 border-pink-600 text-pink-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-b-2 border-transparent'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 hidden sm:block" />
                  2: Registration
                </button>
                <button
                  onClick={() => setActiveTab('email3')}
                  className={`flex-1 py-3 px-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'email3' 
                      ? 'bg-white border-b-2 border-pink-600 text-pink-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-b-2 border-transparent'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 hidden sm:block" />
                  3: Document Delivery (PDF)
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`flex-1 py-3 px-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'pdf' 
                      ? 'bg-white border-b-2 border-pink-600 text-pink-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-b-2 border-transparent'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 hidden sm:block" />
                  PDF Attachment
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-0">
                {activeTab === 'email1' && (
                  <div className="flex flex-col md:flex-row h-[500px] divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
                      <div className="px-3 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HTML Source</span>
                      </div>
                      <pre className="flex-1 overflow-auto p-4 text-[11px] font-mono leading-relaxed text-pink-300/90 whitespace-pre-wrap break-all">
                        {tdHtmlTemplate}
                      </pre>
                    </div>
                    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Live Render</span>
                        <span className="text-[11px] font-medium text-gray-700 truncate">
                          Subject: New insurance documents will be ready for you in MyInsurance within 24 hours
                        </span>
                      </div>
                      <div className="flex-1 overflow-auto bg-gray-50 border-t border-gray-200">
                        <div dangerouslySetInnerHTML={{ __html: tdHtmlTemplate }} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'email2' && (
                  <div className="flex flex-col md:flex-row h-[500px] divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
                      <div className="px-3 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HTML Source</span>
                      </div>
                      <pre className="flex-1 overflow-auto p-4 text-[11px] font-mono leading-relaxed text-pink-300/90 whitespace-pre-wrap break-all">
                        {tdRegistrationHtmlTemplate}
                      </pre>
                    </div>
                    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Live Render</span>
                        <span className="text-[11px] font-medium text-gray-700 truncate">
                          Subject: Action Required: Set up your MyInsurance account to access your documents
                        </span>
                      </div>
                      <div className="flex-1 overflow-auto bg-gray-50 border-t border-gray-200">
                        <div dangerouslySetInnerHTML={{ __html: tdRegistrationHtmlTemplate }} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'email3' && (
                  <div className="flex flex-col md:flex-row h-[500px] divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
                      <div className="px-3 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HTML Source</span>
                      </div>
                      <pre className="flex-1 overflow-auto p-4 text-[11px] font-mono leading-relaxed text-pink-300/90 whitespace-pre-wrap break-all">
                        {tdDeliveryHtmlTemplate}
                      </pre>
                    </div>
                    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Live Render</span>
                        <span className="text-[11px] font-medium text-gray-700 truncate">
                          Subject: {tdDeliverySubject}
                        </span>
                      </div>
                      <div className="flex-1 overflow-auto bg-white border-t border-gray-200 relative p-4">
                        <div className="mb-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg shadow-2xs">
                           <FileText className="w-4 h-4 text-emerald-600" />
                           <span className="text-xs font-semibold text-emerald-900">Attachment: Temporary Automobile Liability Insurance Card.pdf</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: tdDeliveryHtmlTemplate }} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'pdf' && (
                  <div className="flex flex-col h-[500px] bg-gray-200 items-center justify-center p-4">
                    {isGeneratingPdf ? (
                      <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
                        <p className="text-sm font-semibold">Generating HD PDF Preview...</p>
                      </div>
                    ) : pdfPreviewUrl ? (
                      <iframe 
                        src={pdfPreviewUrl} 
                        className="w-full h-full border border-gray-300 rounded-xl shadow-md bg-white"
                        title="PDF Preview"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                        <ImageIcon className="w-8 h-8 opacity-50" />
                        <p className="text-sm font-medium">PDF preview is generating...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleCopyImageToClipboard}
              className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              {copiedImage ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedImage ? 'Copied PNG' : 'Copy Preview (PNG)'}</span>
            </button>
            <button
              onClick={onDownloadPdf}
              className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Local PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
