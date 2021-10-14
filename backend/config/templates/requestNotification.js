module.exports = ({ trackingNumber, requestStatus, msg }) => {
    return `<div style="width:100%!important;background-color:#ececec;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;font-family:HelveticaNeue,sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ececec">
        <tbody>
            <tr style="border-collapse:collapse">
                <td align="center" bgcolor="#ececec" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                    <table width="640" cellpadding="0" cellspacing="0" border="0" style="margin-top:0;margin-bottom:0;margin-right:10px;margin-left:10px">
                        <tbody>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="20" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>

                        <tr style="border-collapse:collapse;">
                                <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#8A0020" style="border-radius:6px 6px 0px 0px;background-color:#8A0020;color:#464646">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="350" valign="middle" align="left" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                </td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="255" valign="middle" align="right" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                    <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" align="center" bgcolor="#8A0020" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <div align="center" style="text-align:center;display: flex;justify-content: center;align-items: center; padding-bottom: 10px;">
                                        <a href="https://thomcare.herokuapp.com/" target="_blank" style="font-size:36px; color:#fff; text-decoration:none; font-family:'calibri', arial, verdana; display:block; margin:20px 0px;">
                                            <img style="max-width: 45px;" src="https://res.cloudinary.com/dwcxehcui/image/upload/v1630769727/logo/UST-Seal-College-of-Information-Computing-Sciences_ghtsuq.png" alt="logo"> <span style="font-size: 40px;">ThomCare</span>
                                        </a><br />
                                    </div>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="30" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table align="left" width="640" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                    <table width="580" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                    <p align="left" style="font-size:18px;line-height:24px;color:#8a0020;font-weight:bold;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">REQUEST UPDATE</p>
                                                                    <div align="left" style="font-size:13px;line-height:18px;color:#464646;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">
                                                                        <table border="0" cellpadding="5" cellspacing="0" width="100%" style="font-size:15px;font-family:'calibri',arial,verdana;line-height:2">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse">
                                                                                    <td width="100%" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                                    Current Status: ${requestStatus} 
                                                                                    </td>
                                                                                </tr>
                                                                                <tr style="border-collapse:collapse">
                                                                                    <td width="100%" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                                    Remarks: ${msg}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr style="border-collapse:collapse">
                                                                                    <td width="100%" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                                        <br></br>
                                                                                    Track your request <a href="https://thomcare.herokuapp.com/track" target="_blank">here</a>.
                                                                                    If you have any concerns or inquiries, you may contact us through our website.
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="580" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="15" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>

                            <tr style="border-collapse:collapse">
                                <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#043948" style="border-radius:0px 0px 6px 6px;background-color:#043948;color:#e2e2e2">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="360" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="360" height="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>`
}