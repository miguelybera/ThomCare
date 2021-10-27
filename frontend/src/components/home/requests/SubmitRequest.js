import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Container, Row, Col, OverlayTrigger, Tooltip, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import { Markup } from 'interweave'
import { submitRequest, clearErrors } from './../../../actions/requestActions'
import { SUBMIT_REQUEST_RESET } from './../../../constants/requestConstants'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import dateformat from 'dateformat'

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const SubmitRequest = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, success, error, request } = useSelector(state => state.submitRequest)
    const { user } = useSelector(state => state.auth)

    const [fileRequirements, setFileRequirements] = useState([])
    const [requestInfo, setRequestInfo] = useState({
        yearLevel: '',
        section: '',
        notes: '',
        requestType: ''
    })

    const { yearLevel, section, notes, requestType } = requestInfo

    const levels = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Alumni', 'Irregular']
    const requestTypes = [
        'Adding/Dropping of Course',
        'Cross Enrollment within CICS',
        'Cross Enrollment outside CICS',
        'Request for Petition Classes within CICS',
        'Request for Crediting of Courses',
        'Request for Overload',
        'Request to Override',
        'Request for Late Enrollment',
        'Request for Manual Enrollment',
        'Request for Course Description',
        'Request for Certificate of Grades',
        'Request for Leave of Absence',
        'Submission of Admission Memo',
        'Others (Dept Chair)',
        'Others (CICS Office)'
    ]

    let alphabet = []

    const upperCase = (text) => text.toUpperCase()
    const changeDateFormat = date => dateformat(date, "mmm d, yyyy h:MMtt")

    for (let i = 0; i < 26; i++) {
        alphabet.push(upperCase((i + 10).toString(36)))
    }

    const reset = () => {
        dispatch({
            type: SUBMIT_REQUEST_RESET
        })
    }

    useEffect(() => {
        if (success) {
            alert.success('File submitted.')

            setFileRequirements([])
            setRequestInfo({
                yearLevel: '',
                section: '',
                notes: '',
                requestType: ''
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, success, error])

    const onChange = e => {
        const files = Array.from(e.target.files)

        setFileRequirements([])

        files.forEach(file => {
            setFileRequirements(oldArray => [...oldArray, file])
        })
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        fileRequirements.forEach(file => {
            formData.append('fileRequirements', file)
        })
        formData.set('section', section)
        formData.set('yearLevel', yearLevel)
        formData.set('notes', notes)
        formData.set('requestType', requestType)

        dispatch(submitRequest(formData))
    }

    const onInfoChange = e => {
        e.preventDefault()

        if (e.target.name === 'yearLevel') {
            if (e.target.value === 'Alumni') {
                setRequestInfo({
                    ...requestInfo,
                    yearLevel: e.target.value,
                    section: 'Alumni'
                })
            } else if (e.target.value === 'Irregular') {
                setRequestInfo({
                    ...requestInfo,
                    yearLevel: e.target.value,
                    section: 'Irregular'
                })
            } else {
                setRequestInfo({
                    ...requestInfo,
                    yearLevel: e.target.value,
                    section: section === 'Alumni' || section == 'Irregular' ? '' : section
                })
            }
        } else if (e.target.name === 'section') {
            if (e.target.value === 'Alumni') {
                setRequestInfo({
                    ...requestInfo,
                    yearLevel: 'Alumni',
                    section: e.target.value
                })
            } else if (e.target.value === 'Irregular') {
                setRequestInfo({
                    ...requestInfo,
                    yearLevel: 'Irregular',
                    section: e.target.value
                })
            } else {
                setRequestInfo({
                    ...requestInfo,
                    section: e.target.value,
                    yearLevel: yearLevel === 'Alumni' || yearLevel === 'Irregular' ? '' : yearLevel
                })
            }
        } else {
            setRequestInfo({
                ...requestInfo,
                [e.target.name]: e.target.value
            })
        }
    }

    const privacyPolicy = `
    <p>At ThomCare, accessible from thomcare.herokuapp.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ThomCare and how we use it.</p>
    <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
    <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ThomCare. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicygenerator.info">Free Privacy Policy Generator</a>.</p>
    <h3>Consent</h3>
    <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
    <h3>Information we collect</h3>
    <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
    <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
    <p>When you register for an Account, we may ask for your contact information, including items such as full name, and email address.</p>
    <h3>How we use your information</h3>
    <p>We use the information we collect in various ways, including to:</p>
    <ul>
    <li>Provide, operate, and maintain our website</li>
    <li>Improve, personalize, and expand our website</li>
    <li>Use services, features, and functionality</li>
    <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website</li>
    <li>Send you emails</li>
    <li>Find and prevent fraud</li>
    </ul>
    <h3>Log Files</h3>
    <p>ThomCare follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
    <h3>Cookies and Web Beacons</h3>
    <p>Like any other website, ThomCare uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
    <p>For more general information on cookies, please read <a href="https://www.generateprivacypolicy.com/#cookies">"Cookies" article from the Privacy Policy Generator</a>.</p>
    <h3>Advertising Partners Privacy Policies</h3>
    <P>You may consult this list to find the Privacy Policy for each of the advertising partners of ThomCare.</p>
    <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ThomCare, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
    <p>Note that ThomCare has no access to or control over these cookies that are used by third-party advertisers.</p>
    <h3>Third Party Privacy Policies</h3>
    <p>ThomCare's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>
    <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
    <h3>CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
    <p>Under the CCPA, among other rights, consumers have the right to:</p>
    <p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
    <p>Request that a business delete any personal data about the consumer that a business has collected.</p>
    <p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
    <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
    <h3>GDPR Data Protection Rights</h3>
    <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
    <p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
    <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
    <p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
    <p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
    <p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
    <p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
    <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
    <p>ThomCare does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>`

    const termsAndConditions = `
    <p>Last updated: 2021-10-26</p>
    <p>1. <b>Introduction</b></p>
    <p>Welcome to <b>ThomCare</b> (“Company”, “we”, “our”, “us”)!</p>
    <p>These Terms of Service (“Terms”, “Terms of Service”) govern your use of our website located at <b>thomcare.herokuapp.com</b> (together or individually “Service”) operated by <b>ThomCare</b>.</p>
    <p>Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</p>
    <p>Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them.</p>
    <p>If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at <b>iics@ust.edu.ph</b> so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>
    <p>2. <b>Communications</b></p>
    <p>By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at iics@ust.edu.ph.</p>
    <p>3. <b>Contests, Sweepstakes and Promotions</b></p>
    <p>Any contests, sweepstakes or other promotions (collectively, “Promotions”) made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.</p>
    <p>4. <b>Content</b></p><p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (“Content”). You are responsible for Content that you post on or through Service, including its legality, reliability, and appropriateness.</p><p>By posting Content on or through Service, You represent and warrant that: (i) Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.</p><p>You retain any and all of your rights to any Content you submit, post or display on or through Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through Service. However, by posting Content using Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through Service. You agree that this license includes the right for us to make your Content available to other users of Service, who may also use your Content subject to these Terms.</p><p>ThomCare has the right but not the obligation to monitor and edit all Content provided by users.</p><p>In addition, Content found on or through this Service are the property of ThomCare or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>
    <p>5. <b>Prohibited Uses</b></p>
    <p>You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
    <p>0.1. In any way that violates any applicable national or international law or regulation.</p>
    <p>0.2. For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</p>
    <p>0.3. To transmit, or procure the sending of, any advertising or promotional material, including any “junk mail”, “chain letter,” “spam,” or any other similar solicitation.</p>
    <p>0.4. To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.</p>
    <p>0.5. In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</p>
    <p>0.6. To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.</p>
    <p>Additionally, you agree not to:</p>
    <p>0.1. Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party’s use of Service, including their ability to engage in real time activities through Service.</p>
    <p>0.2. Use any robot, spider, or other automatic device, process, or means to access Service for any purpose, including monitoring or copying any of the material on Service.</p>
    <p>0.3. Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.</p>
    <p>0.4. Use any device, software, or routine that interferes with the proper working of Service.</p>
    <p>0.5. Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.</p>
    <p>0.6. Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.</p>
    <p>0.7. Attack Service via a denial-of-service attack or a distributed denial-of-service attack.</p>
    <p>0.8. Take any action that may damage or falsify Company rating.</p>
    <p>0.9. Otherwise attempt to interfere with the proper working of Service.</p>
    <p>6. <b>Analytics</b></p>
    <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
    <p>7. <b>No Use By Minors</b></p>
    <p>Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of Service.</p>
    <p>8. <b>Accounts</b></p><p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.</p><p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p><p>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.</p><p>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>
    <p>9. <b>Intellectual Property</b></p>
    <p>Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of ThomCare and its licensors. Service is protected by copyright, trademark, and other laws of  and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of ThomCare.</p>
    <p>10. <b>Copyright Policy</b></p>
    <p>We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights (“Infringement”) of any person or entity.</p>
    <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to iics@ust.edu.ph, with the subject line: “Copyright Infringement” and include in your claim a detailed description of the alleged Infringement as detailed below, under “DMCA Notice and Procedure for Copyright Infringement Claims”</p>
    <p>You may be held accountable for damages (including costs and attorneys’ fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.</p>
    <p>11. <b>DMCA Notice and Procedure for Copyright Infringement Claims</b></p>
    <p>You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>
    <p>0.1. an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright’s interest;</p>
    <p>0.2. a description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work;</p>
    <p>0.3. identification of the URL or other specific location on Service where the material that you claim is infringing is located;</p>
    <p>0.4. your address, telephone number, and email address;</p>
    <p>0.5. a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</p>
    <p>0.6. a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf.</p>
    <p>You can contact our Copyright Agent via email at iics@ust.edu.ph.</p>
    <p>12. <b>Error Reporting and Feedback</b></p>
    <p>You may provide us either directly at iics@ust.edu.ph or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (“Feedback”). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) Company is not under any obligation of confidentiality with respect to the Feedback. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.</p>
    <p>13. <b>Links To Other Web Sites</b></p>
    <p>Our Service may contain links to third party web sites or services that are not owned or controlled by ThomCare.</p>
    <p>ThomCare has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</p>
    <p>For example, the outlined <a href="https://policymaker.io/terms-and-conditions/">Terms of Use</a> have been created using <a href="https://policymaker.io/">PolicyMaker.io</a>, a free web application for generating high-quality legal documents. PolicyMaker’s <a href="https://policymaker.io/terms-and-conditions/">Terms and Conditions generator</a> is an easy-to-use free tool for creating an excellent standard Terms of Service template for a website, blog, e-commerce store or app.</p>
    <p>YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.</p>
    <p>WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.</p>
    <p>14. <b>Disclaimer Of Warranty</b></p>
    <p>THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.</p>
    <p>NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.</p>
    <p>COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>
    <p>THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</p>
    <p>15. <b>Limitation Of Liability</b></p>
    <p>EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.</p>
    <p>16. <b>Termination</b></p>
    <p>We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.</p>
    <p>If you wish to terminate your account, you may simply discontinue using Service.</p>
    <p>All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
    <p>17. <b>Governing Law</b></p>
    <p>These Terms shall be governed and construed in accordance with the laws of Philippines, which governing law applies to agreement without regard to its conflict of law provisions.</p>
    <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.</p>
    <p>18. <b>Changes To Service</b></p>
    <p>We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.</p>
    <p>19. <b>Amendments To Terms</b></p>
    <p>We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.</p>
    <p>Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</p>
    <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.</p>
    <p>20. <b>Waiver And Severability</b></p>
    <p>No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.</p>
    <p>If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.</p>
    <p>21. <b>Acknowledgement</b></p>
    <p>BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</p>
    <p>22. <b>Contact Us</b></p>
    <p>Please send your feedback, comments, requests for technical support by email: <b>iics@ust.edu.ph</b>.</p>
    <p style="margin-top: 5em; font-size: 0.7em;">These <a href="https://policymaker.io/terms-and-conditions/">Terms of Service</a> were created for <b>thomcare.herokuapp.com</b> by <a href="https://policymaker.io">PolicyMaker.io</a> on 2021-10-26.</p>`

    function Terms() {
        const [show, setShow] = useState(false);

        return (
            <>
                <span onClick={() => setShow(true)} style={{ color: 'blue' }}>terms</span>
                <Modal
                    size="lg"
                    show={show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Terms and Conditions
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Markup content={termsAndConditions} />
                        <center>
                            <Button
                                variant='outline-secondary'
                                onClick={() => setShow(false)}
                                style={{ margin: '10px 5px', width: '10rem' }}
                            >
                                Close
                        </Button>
                        </center>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    function PrivacyPolicy() {
        const [show, setShow] = useState(false);

        return (
            <>
                <span onClick={() => setShow(true)} style={{ color: 'blue' }}>data privacy</span>
                <Modal
                    size="lg"
                    show={show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Privacy Policy
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Markup content={privacyPolicy} />
                        <center>
                            <Button
                                variant='outline-secondary'
                                onClick={() => setShow(false)}
                                style={{ margin: '10px 5px', width: '10rem' }}
                            >
                                Close
                            </Button>
                        </center>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    return (
        <>
            <MetaData title={'Submit Request'} />
            <Row>
                <Col xs={12} md={6} lg={5}>
                    <Container fluid>
                        <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                            <Card style={{ align: 'center', marginBottom: '50px' }}>
                                <h5 style={{ marginTop: '20px' }}>General Instructions</h5>
                                <Card.Body>
                                    <Card.Text>For requests such as <strong>Add/Drop Course Form, Overload Form, and Cross-enrollment forms</strong>, go to <Link to='/forms/list'>Generate Form</Link> page.</Card.Text>
                                    <Card.Text>1. Select form.</Card.Text>
                                    <Card.Text>2. Fill out the fields.</Card.Text>
                                    <Card.Text>3. Click the 'Generate Form' button.</Card.Text>
                                    <Card.Text>4. Confirm the details on the page. Click the 'Save as PDF' to download the file.</Card.Text>
                                    <Card.Text>5. Attach e-signature, if required.</Card.Text>
                                    <Card.Text>6. Submit the document by filling out the <strong>Submit Request</strong> form.</Card.Text>
                                    <Card.Text>7. Attach the required documents.</Card.Text>
                                    <Card.Text>8. Click the 'Submit' button.</Card.Text>
                                    <hr />
                                    <Card.Text>For other requests <strong>not available</strong> in the Generate Forms page, go to <Link to='/downloadable/forms/list'>Downloadable Forms</Link> page.</Card.Text>
                                    <Card.Text>1. Select form to download.</Card.Text>
                                    <Card.Text>2. Fill out the fields in the document.</Card.Text>
                                    <Card.Text>3. Submit the document by filling out the <strong>Submit Request</strong> form.</Card.Text>
                                    <Card.Text>4. Attach the required documents.</Card.Text>
                                    <Card.Text>5. Click the 'Submit' button.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Container>
                </Col>
                <Col xs={12} md={6} lg={7}>
                    {!success ? (
                        <Container fluid>
                            <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                                <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '7px solid #9c0b0b', marginBottom: '50px' }}>
                                    <Card.Body>
                                        <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>Submit Request</Card.Title>
                                        <Form onSubmit={submitHandler}>
                                            <Row>
                                                <Col xs={12} sm={12} md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Year Level: </Form.Label>
                                                        <Form.Select
                                                            className="mb-3"
                                                            aria-label="Default select example"
                                                            name="yearLevel" value={yearLevel}
                                                            onChange={onInfoChange}
                                                            required
                                                        >
                                                            <option value=''>-</option>
                                                            {levels.map(level => (
                                                                <option value={level}>{level}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} sm={12} md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Section: </Form.Label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            name='section'
                                                            value={section}
                                                            onChange={onInfoChange}
                                                            disabled={yearLevel === 'Alumni' || yearLevel === 'Irregular' ? true : false}
                                                            required
                                                        >
                                                            <option value=''>-</option>
                                                            <option value='Alumni'>Alumni</option>
                                                            <option value='Irregular'>Irregular</option>
                                                            {alphabet.map(letter => (
                                                                <option value={letter}>{letter}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Request Type: </Form.Label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    name='requestType'
                                                    value={requestType}
                                                    onChange={onInfoChange}
                                                    required
                                                >
                                                    <option value=''>-</option>
                                                    {requestTypes.map(type => (
                                                        <option value={type}>{type}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Notes: </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder="(Optional)"
                                                    rows={4}
                                                    name='notes'
                                                    value={notes}
                                                    onChange={onInfoChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Attachments: &nbsp;
                                                    <OverlayTrigger
                                                        placement='bottom-start'
                                                        overlay={
                                                            <Tooltip id="tooltip-disabled" >
                                                                Accepted File Formats:
                                                                <ul style={{ textAlign: 'left' }}>
                                                                    <li>PDF</li>
                                                                    <li>JPG</li>
                                                                    <li>PNG</li>
                                                                    <li>Word File</li>
                                                                    <li>Excel File</li>
                                                                </ul>
                                                            </Tooltip >
                                                        }>
                                                        <span class="fa fa-question-circle" style={{ marginRight: '.3rem' }} />
                                                    </OverlayTrigger>
                                                </Form.Label>
                                                <Form.Control type="file" name="fileRequirements" onChange={onChange} multiple required />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <ListGroup>
                                                    {fileRequirements.map((file, idx) => (
                                                        <ListGroupItem>
                                                            File {idx + 1}: {file.name}
                                                        </ListGroupItem>
                                                    ))}
                                                </ListGroup>
                                            </Form.Group>
                                            <center>
                                                <Button
                                                    type='submit'
                                                    style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                                    disabled={loading || user.role !== 'Student' ? true : false}
                                                >
                                                    {loading ? (
                                                        <span>
                                                            <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                                        </span>
                                                    ) : (
                                                        <span>Submit</span>
                                                    )}
                                                </Button>
                                            </center>
                                            <Card.Text>
                                                <center>
                                                    <span style={{ textAlign: 'center', fontSize: '12px' }}>
                                                        <i>By clicking Submit, you agree to our <Terms /> and <PrivacyPolicy />.</i>
                                                    </span>
                                                </center>
                                            </Card.Text>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Container>
                    )
                        : (
                            <Fragment style={{ marginTop: '30px' }}>
                                <Card style={cardStyle}>
                                    <Card.Body>
                                        <Card.Title>Tracking ID#: {request?.trackingNumber}</Card.Title>
                                        <Card.Text><span className='text-muted'><strong>Date submitted:</strong> {changeDateFormat(request.createdAt)}</span></Card.Text>
                                        <Card.Text><b>Name:</b> {request?.requestorInfo.lastName}, {request?.requestorInfo.firstName}</Card.Text>
                                        <Card.Text><b>Request Type:</b> {request?.requestType}</Card.Text>
                                        <Card.Text><b>Notes:</b> {request?.notes}</Card.Text>
                                        <Card.Text>
                                            Attachments:
                                            <ListGroup>
                                                {request?.fileRequirements.map((file, idx) => (
                                                    <ListGroupItem>
                                                        {file.originalname} <span style={{ margin: '0 5px', fontSize: '1rem' }} className="text-muted">
                                                            {Number(file.size / 1000000).toFixed(2)} MB
                                                        </span> <span style={{ margin: '0 5px' }}>
                                                            <a href={file.path} target="_blank" rel="noreferrer">
                                                                <button className="btn btn-outline-success py-1 px-2 ml-2">
                                                                    <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none' }} />
                                                                </button>
                                                            </a>
                                                        </span>
                                                    </ListGroupItem>
                                                ))}
                                            </ListGroup>
                                        </Card.Text>
                                        <Card.Text>
                                            <center><Button variant='outline-secondary' onClick={() => reset()}>Back</Button></center>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Fragment>
                        )
                    }
                </Col>
            </Row >
        </>
    )
}

export default SubmitRequest