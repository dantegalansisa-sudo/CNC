import type { Lang, PracticeKey } from './content';

/* URL slugs (language independent) */
export const SLUGS: Record<PracticeKey, string> = {
  contracts: 'contract-law',
  notary: 'notary-services',
  civil: 'civil-law',
  family: 'family-law',
  admin: 'administrative-law',
};

export const servicePath = (k: PracticeKey) => `/services/${SLUGS[k]}`;

export const keyFromSlug = (slug?: string): PracticeKey | null =>
  (Object.keys(SLUGS) as PracticeKey[]).find((k) => SLUGS[k] === slug) ?? null;

type Pair = { t: string; d: string };
type QA = { q: string; a: string };

export type ServicePage = {
  seo: { title: string; description: string };
  intro: string;
  why: string;
  offer: Pair[];
  steps: Pair[];
  bring: string[];
  faqs: QA[];
};

/* Shared UI labels for the service pages */
export const UI = {
  en: {
    home: 'Home',
    areas: 'Practice areas',
    request: 'Request this service',
    talk: 'Talk to an attorney',
    facts: [
      { t: 'Response', d: 'Within one business day' },
      { t: 'Format', d: 'In person or virtual' },
      { t: 'Language', d: 'English · Spanish' },
    ],
    offerEyebrow: 'What we handle',
    offerTitle: ['Services in', 'this area.'],
    stepsEyebrow: 'How it works',
    stepsTitle: ['From first call', 'to resolution.'],
    bringEyebrow: 'Prepare your consultation',
    bringTitle: ['What to', 'have on hand.'],
    bringNote: 'Don’t have everything? Request your consultation anyway — we will tell you exactly what is needed.',
    faqEyebrow: 'Questions about this service',
    form: {
      eyebrow: 'Service request',
      title: ['Request', 'this service.'],
      sub: 'Complete the form and our office will contact you to confirm details and schedule your consultation.',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      service: 'Specific service',
      servicePh: 'Select a service',
      other: 'Other / not sure',
      mode: 'Preferred consultation',
      modes: ['In person', 'Video call', 'Phone call'],
      contact: 'Best way to reach you',
      contacts: ['WhatsApp', 'Phone call', 'Email'],
      urgency: 'Timeline',
      urgencies: ['As soon as possible', 'Within 2 weeks', 'Just exploring'],
      msg: 'Tell us about your matter',
      msgPh: 'A brief description (no confidential details, please)',
      consent: 'I understand that submitting this request does not create an attorney-client relationship.',
      send: 'Send request by email',
      sendWa: 'Send by WhatsApp',
      sent: 'Your email app will open with the request ready to send.',
      subject: 'Service request',
      steps: ['Your details', 'Your matter'],
    },
    others: 'Other practice areas',
    view: 'View service',
  },
  es: {
    home: 'Inicio',
    areas: 'Áreas de práctica',
    request: 'Solicitar este servicio',
    talk: 'Hablar con una abogada',
    facts: [
      { t: 'Respuesta', d: 'En un día laborable' },
      { t: 'Modalidad', d: 'Presencial o virtual' },
      { t: 'Idioma', d: 'Español · Inglés' },
    ],
    offerEyebrow: 'Lo que atendemos',
    offerTitle: ['Servicios en', 'esta área.'],
    stepsEyebrow: 'Cómo funciona',
    stepsTitle: ['De la primera llamada', 'a la solución.'],
    bringEyebrow: 'Prepara tu consulta',
    bringTitle: ['Qué tener', 'a la mano.'],
    bringNote: '¿No tienes todo? Solicita tu consulta de todos modos — te diremos exactamente lo que hace falta.',
    faqEyebrow: 'Preguntas sobre este servicio',
    form: {
      eyebrow: 'Solicitud de servicio',
      title: ['Solicita', 'este servicio.'],
      sub: 'Completa el formulario y nuestra oficina te contactará para confirmar los detalles y agendar tu consulta.',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      service: 'Servicio específico',
      servicePh: 'Selecciona un servicio',
      other: 'Otro / no estoy seguro',
      mode: 'Consulta preferida',
      modes: ['Presencial', 'Videollamada', 'Llamada telefónica'],
      contact: 'Mejor forma de contactarte',
      contacts: ['WhatsApp', 'Llamada', 'Correo electrónico'],
      urgency: 'Plazo',
      urgencies: ['Lo antes posible', 'En 2 semanas', 'Solo estoy explorando'],
      msg: 'Cuéntanos sobre tu asunto',
      msgPh: 'Una breve descripción (sin detalles confidenciales, por favor)',
      consent: 'Entiendo que enviar esta solicitud no crea una relación abogado-cliente.',
      send: 'Enviar solicitud por correo',
      sendWa: 'Enviar por WhatsApp',
      sent: 'Tu aplicación de correo se abrirá con la solicitud lista para enviar.',
      subject: 'Solicitud de servicio',
      steps: ['Tus datos', 'Tu asunto'],
    },
    others: 'Otras áreas de práctica',
    view: 'Ver servicio',
  },
} as const;

const en: Record<PracticeKey, ServicePage> = {
  contracts: {
    seo: {
      title: 'Contract Lawyer in Puerto Rico | CNC Law Firm',
      description: 'Drafting, review and negotiation of commercial, lease, purchase and prenuptial agreements in Puerto Rico. Bilingual counsel in English and Spanish.',
    },
    intro: 'A well-drafted contract is the cheapest insurance a business or family can buy. We draft, review and negotiate agreements under Puerto Rico’s Civil Code so your terms are clear, enforceable and aligned with what you actually agreed.',
    why: 'Puerto Rico follows a civil law tradition with its own Civil Code (2020). Templates written for U.S. states often miss local requirements — we adapt every agreement to Puerto Rico law.',
    offer: [
      { t: 'Commercial & service agreements', d: 'Supplier, client, consulting and professional services contracts with clear scope, payment and termination terms.' },
      { t: 'Lease agreements', d: 'Residential and commercial leases that protect landlords and tenants, including renewals and deposits.' },
      { t: 'Purchase & sale agreements', d: 'Option and purchase contracts for property, vehicles and business assets.' },
      { t: 'Contract review & negotiation', d: 'A second set of eyes before you sign — we flag risks and negotiate better terms on your behalf.' },
      { t: 'Prenuptial agreements', d: 'Marital property agreements (capitulaciones) drafted before the wedding, as required in Puerto Rico.' },
      { t: 'Amendments & terminations', d: 'Modifying, extending or ending existing agreements without creating new disputes.' },
    ],
    steps: [
      { t: 'Initial consultation', d: 'We understand the deal, the parties and what you need to protect.' },
      { t: 'Proposal & fees', d: 'You receive the scope of work and fees before anything begins.' },
      { t: 'Drafting or review', d: 'We prepare the document or a marked-up version with clear comments.' },
      { t: 'Signature & follow-up', d: 'We finalize, coordinate signatures and remain available for questions.' },
    ],
    bring: ['Any draft or existing contract', 'Names and details of all parties', 'Key terms: price, dates, deliverables', 'Related emails or prior agreements', 'Identification of the signers'],
    faqs: [
      { q: 'Can you review a contract someone else drafted?', a: 'Yes. Contract review is one of our most requested services. We explain each clause in plain language and suggest changes before you sign.' },
      { q: 'Does a contract need to be notarized in Puerto Rico?', a: 'Not always. Some documents — such as deeds and certain powers of attorney — require a public instrument before a notary. We will tell you if yours does.' },
      { q: 'Can you prepare contracts in English?', a: 'Yes. We draft in English or Spanish, and can prepare bilingual versions when the parties need them.' },
    ],
  },
  notary: {
    seo: {
      title: 'Notary in Puerto Rico | Powers of Attorney, Affidavits & Deeds | CNC Law Firm',
      description: 'Puerto Rico notary services by a licensed attorney: powers of attorney, affidavits, deeds, public instruments and authentications. In person or coordinated remotely.',
    },
    intro: 'In Puerto Rico, a notary is a licensed attorney who drafts and gives public faith to legal documents. We prepare and notarize the documents you need — accurately, on time and with a clear explanation of what you are signing.',
    why: 'A Puerto Rico notary’s role is far broader than a U.S. notary public. Documents for use in Puerto Rico often must be executed before a local attorney-notary to be valid.',
    offer: [
      { t: 'Powers of attorney', d: 'General and special powers so a trusted person can act on your behalf in Puerto Rico.' },
      { t: 'Affidavits', d: 'Sworn statements (declaraciones juradas) for employers, agencies, banks and schools.' },
      { t: 'Deeds & public instruments', d: 'Deeds of purchase, donation and other public instruments drafted and executed before the notary.' },
      { t: 'Authentications', d: 'Authentication of signatures on private documents.' },
      { t: 'Documents for U.S. mainland clients', d: 'Guidance on what can be coordinated remotely and what requires an appearance in Puerto Rico.' },
    ],
    steps: [
      { t: 'Tell us what you need', d: 'Share the document type and where it will be used.' },
      { t: 'Document preparation', d: 'We draft the document and confirm the information with you.' },
      { t: 'Appointment & signature', d: 'You sign before the notary at a scheduled appointment.' },
      { t: 'Delivery', d: 'You receive your notarized document or certified copy.' },
    ],
    bring: ['Valid photo identification', 'Full names and addresses of the parties', 'Property or account details, if applicable', 'Any form required by the receiving entity', 'Witness information, if required'],
    faqs: [
      { q: 'Can I sign a Puerto Rico document from the U.S. mainland?', a: 'It depends on the document. Some can be executed with a power of attorney or signed before a notary where you live and then authenticated. We explain the right route for your case.' },
      { q: 'How long does it take to prepare a power of attorney?', a: 'Most standard documents can be prepared promptly once we have the information. We confirm timing when you request the service.' },
      { q: 'What identification do I need?', a: 'A valid government-issued photo ID, such as a driver’s license or passport.' },
    ],
  },
  civil: {
    seo: {
      title: 'Civil Law & Litigation Attorney in Puerto Rico | CNC Law Firm',
      description: 'Extrajudicial claims, civil lawsuits, collections, damages and guardianship proceedings in Puerto Rico. Practical, bilingual legal representation.',
    },
    intro: 'When a dispute affects your money, property or family, you need a clear strategy. We protect your rights from the first demand letter through trial — negotiating when it serves you and litigating when it is necessary.',
    why: 'Many disputes can be resolved before reaching court. We evaluate every case for the fastest, most cost-effective path to a solution.',
    offer: [
      { t: 'Extrajudicial claims', d: 'Formal demand letters and negotiation to resolve disputes before filing a lawsuit.' },
      { t: 'Civil lawsuits', d: 'Representation as plaintiff or defendant in Puerto Rico courts.' },
      { t: 'Collections of money', d: 'Recovering unpaid debts for individuals and businesses.' },
      { t: 'Damages', d: 'Claims for damages arising from breach of contract or other civil liability.' },
      { t: 'Guardianship proceedings', d: 'Petitions to appoint a guardian (tutela) for a minor or a person who needs protection.' },
    ],
    steps: [
      { t: 'Case evaluation', d: 'We review the facts and documents and explain your options.' },
      { t: 'Strategy', d: 'We agree on goals, scope and fees before acting.' },
      { t: 'Negotiation or filing', d: 'We pursue a settlement or file the appropriate action.' },
      { t: 'Representation', d: 'We represent you at every stage and keep you informed.' },
    ],
    bring: ['Contracts, invoices or receipts', 'Letters, emails and messages related to the dispute', 'Photos or other evidence', 'Names of the people involved', 'Any court documents you have received'],
    faqs: [
      { q: 'Do all disputes end up in court?', a: 'No. Many matters are resolved through a demand letter and negotiation. We recommend litigation only when it is in your interest.' },
      { q: 'I received a lawsuit. What should I do?', a: 'Contact us right away. Court deadlines to respond are short, and acting early protects your options.' },
      { q: 'How long does a civil case take?', a: 'It varies with the complexity of the case and the court’s calendar. We give you a realistic estimate after reviewing your matter.' },
    ],
  },
  family: {
    seo: {
      title: 'Family Law & Civil Weddings in Puerto Rico | CNC Law Firm',
      description: 'Civil wedding ceremonies, prenuptial agreements, divorce and guardianship in Puerto Rico. Discreet, bilingual guidance for couples and families.',
    },
    intro: 'Life’s most important moments deserve careful legal guidance. From officiating your civil wedding to handling a divorce or guardianship, we act with discretion, sensitivity and clarity at every step.',
    why: 'Planning a wedding in Puerto Rico from abroad? We coordinate the legal ceremony and the documents you need so your marriage is valid from day one.',
    offer: [
      { t: 'Civil wedding ceremonies', d: 'Legal ceremonies officiated by an attorney-notary, including destination weddings.' },
      { t: 'Prenuptial agreements', d: 'Marital property agreements executed before the wedding.' },
      { t: 'Divorce', d: 'Divorce by mutual consent and related agreements, handled with discretion.' },
      { t: 'Guardianship (tutela)', d: 'Protecting minors and adults who need a legal guardian.' },
    ],
    steps: [
      { t: 'Private consultation', d: 'We listen to your situation in confidence.' },
      { t: 'Plan & documents', d: 'We explain requirements and prepare the necessary documents.' },
      { t: 'Ceremony or filing', d: 'We officiate the ceremony or file before the court.' },
      { t: 'Follow-up', d: 'We stay available until everything is complete.' },
    ],
    bring: ['Identification of both parties', 'Birth certificates', 'Prior marriage or divorce records, if any', 'Proposed date and location (weddings)', 'Information about children and property (divorce)'],
    faqs: [
      { q: 'Can you officiate our destination wedding in Puerto Rico?', a: 'Yes. We officiate civil ceremonies and guide you through the license and document requirements in advance.' },
      { q: 'When must a prenuptial agreement be signed?', a: 'In Puerto Rico, marital property agreements must be executed before the marriage. Plan ahead so there is time to review them calmly.' },
      { q: 'Is my information kept confidential?', a: 'Yes. Family matters are handled with complete discretion.' },
    ],
  },
  admin: {
    seo: {
      title: 'Administrative Law Attorney in Puerto Rico | Agencies & Municipalities | CNC Law Firm',
      description: 'Representation before Puerto Rico administrative agencies and municipalities: filings, hearings, reconsiderations and appeals for individuals and entities.',
    },
    intro: 'Agencies and municipalities make decisions that can affect your permits, licenses, contracts and business. We represent individuals, companies and public and private entities through filings, hearings and appeals.',
    why: 'Administrative processes have strict deadlines. Acting early — especially to request reconsideration — can make the difference.',
    offer: [
      { t: 'Agency representation', d: 'Filings, responses and communications before Puerto Rico agencies.' },
      { t: 'Municipal matters', d: 'Matters before municipalities, including permits, contracts and notices.' },
      { t: 'Administrative hearings', d: 'Preparation and representation at formal and informal hearings.' },
      { t: 'Reconsiderations & appeals', d: 'Challenging adverse decisions within the applicable deadlines.' },
    ],
    steps: [
      { t: 'Review of the notice', d: 'We review the decision or notice and confirm deadlines.' },
      { t: 'Strategy', d: 'We define the best route and the documents needed.' },
      { t: 'Filing & hearing', d: 'We file and represent you before the agency.' },
      { t: 'Decision & next steps', d: 'We explain the outcome and options, including appeal.' },
    ],
    bring: ['The notice, decision or letter received', 'Permits, licenses or contracts involved', 'Prior correspondence with the agency', 'Relevant dates and deadlines', 'Corporate documents, if you represent an entity'],
    faqs: [
      { q: 'How much time do I have to challenge an agency decision?', a: 'Deadlines are short and vary by agency and process. Contact us as soon as you receive the notice.' },
      { q: 'Do you represent companies and public entities?', a: 'Yes. We represent individuals, companies and public and private entities.' },
      { q: 'Can the matter be handled remotely?', a: 'Many steps can be coordinated virtually; some hearings may require attendance. We tell you in advance.' },
    ],
  },
};

const es: Record<PracticeKey, ServicePage> = {
  contracts: {
    seo: {
      title: 'Abogada de Contratos en Puerto Rico | CNC Law Firm',
      description: 'Redacción, revisión y negociación de contratos comerciales, de arrendamiento, compraventa y capitulaciones en Puerto Rico. Servicio bilingüe.',
    },
    intro: 'Un contrato bien redactado es el seguro más económico que puede tener un negocio o una familia. Redactamos, revisamos y negociamos acuerdos bajo el Código Civil de Puerto Rico para que tus términos sean claros, exigibles y fieles a lo que acordaste.',
    why: 'Puerto Rico sigue la tradición civilista con su propio Código Civil (2020). Los modelos de otros estados suelen omitir requisitos locales — adaptamos cada contrato al derecho puertorriqueño.',
    offer: [
      { t: 'Contratos comerciales y de servicios', d: 'Contratos con suplidores, clientes, consultores y servicios profesionales con alcance, pago y terminación claros.' },
      { t: 'Arrendamiento', d: 'Contratos residenciales y comerciales que protegen a arrendadores y arrendatarios, incluyendo renovaciones y depósitos.' },
      { t: 'Compraventa', d: 'Contratos de opción y compraventa de propiedades, vehículos y activos de negocio.' },
      { t: 'Revisión y negociación', d: 'Una segunda mirada antes de firmar — identificamos riesgos y negociamos mejores términos por ti.' },
      { t: 'Capitulaciones matrimoniales', d: 'Acuerdos sobre el régimen de bienes otorgados antes de la boda, como exige la ley en Puerto Rico.' },
      { t: 'Enmiendas y terminaciones', d: 'Modificar, extender o terminar acuerdos sin crear nuevas disputas.' },
    ],
    steps: [
      { t: 'Consulta inicial', d: 'Entendemos el negocio, las partes y lo que necesitas proteger.' },
      { t: 'Propuesta y honorarios', d: 'Recibes el alcance del trabajo y los honorarios antes de comenzar.' },
      { t: 'Redacción o revisión', d: 'Preparamos el documento o una versión revisada con comentarios claros.' },
      { t: 'Firma y seguimiento', d: 'Finalizamos, coordinamos firmas y seguimos disponibles para tus dudas.' },
    ],
    bring: ['Borrador o contrato existente', 'Nombres y datos de todas las partes', 'Términos clave: precio, fechas, entregables', 'Correos o acuerdos previos relacionados', 'Identificación de quienes firmarán'],
    faqs: [
      { q: '¿Pueden revisar un contrato que redactó otra persona?', a: 'Sí. La revisión de contratos es uno de nuestros servicios más solicitados. Te explicamos cada cláusula en lenguaje sencillo y sugerimos cambios antes de firmar.' },
      { q: '¿Un contrato tiene que notarizarse en Puerto Rico?', a: 'No siempre. Algunos documentos — como escrituras y ciertos poderes — requieren instrumento público ante notario. Te diremos si el tuyo lo necesita.' },
      { q: '¿Preparan contratos en inglés?', a: 'Sí. Redactamos en español o inglés, y preparamos versiones bilingües cuando las partes lo necesitan.' },
    ],
  },
  notary: {
    seo: {
      title: 'Notaría en Puerto Rico | Poderes, Declaraciones Juradas y Escrituras | CNC Law Firm',
      description: 'Servicios notariales en Puerto Rico por abogada licenciada: poderes, declaraciones juradas, escrituras, instrumentos públicos y autenticaciones.',
    },
    intro: 'En Puerto Rico, el notario es un abogado licenciado que redacta y da fe pública a documentos legales. Preparamos y notarizamos los documentos que necesitas — con precisión, a tiempo y explicándote claramente lo que firmas.',
    why: 'La función del notario en Puerto Rico es mucho más amplia que la de un notary public en EE. UU. Muchos documentos para uso en Puerto Rico deben otorgarse ante un abogado-notario local para ser válidos.',
    offer: [
      { t: 'Poderes', d: 'Poderes generales y especiales para que una persona de confianza actúe por ti en Puerto Rico.' },
      { t: 'Declaraciones juradas', d: 'Para patronos, agencias, bancos y escuelas.' },
      { t: 'Escrituras e instrumentos públicos', d: 'Escrituras de compraventa, donación y otros instrumentos públicos otorgados ante notario.' },
      { t: 'Autenticaciones', d: 'Autenticación de firmas en documentos privados.' },
      { t: 'Documentos para clientes en EE. UU.', d: 'Orientación sobre qué puede coordinarse a distancia y qué requiere comparecer en Puerto Rico.' },
    ],
    steps: [
      { t: 'Cuéntanos qué necesitas', d: 'Indícanos el tipo de documento y dónde se utilizará.' },
      { t: 'Preparación', d: 'Redactamos el documento y confirmamos la información contigo.' },
      { t: 'Cita y firma', d: 'Firmas ante la notaria en una cita programada.' },
      { t: 'Entrega', d: 'Recibes tu documento notarizado o copia certificada.' },
    ],
    bring: ['Identificación con foto vigente', 'Nombres completos y direcciones de las partes', 'Datos de la propiedad o cuenta, si aplica', 'Formulario requerido por la entidad que lo recibe', 'Información de testigos, si se requieren'],
    faqs: [
      { q: '¿Puedo firmar un documento de Puerto Rico desde EE. UU.?', a: 'Depende del documento. Algunos pueden otorgarse mediante poder o firmarse ante un notario donde vives y luego autenticarse. Te explicamos la vía correcta para tu caso.' },
      { q: '¿Cuánto tarda preparar un poder?', a: 'La mayoría de los documentos comunes se preparan con prontitud una vez tenemos la información. Confirmamos el tiempo al solicitar el servicio.' },
      { q: '¿Qué identificación necesito?', a: 'Una identificación oficial con foto vigente, como licencia de conducir o pasaporte.' },
    ],
  },
  civil: {
    seo: {
      title: 'Abogada de Derecho Civil y Litigio en Puerto Rico | CNC Law Firm',
      description: 'Reclamaciones extrajudiciales, demandas civiles, cobro de dinero, daños y procesos de tutela en Puerto Rico. Representación práctica y bilingüe.',
    },
    intro: 'Cuando una disputa afecta tu dinero, tu propiedad o tu familia, necesitas una estrategia clara. Protegemos tus derechos desde la primera carta de reclamación hasta el juicio — negociando cuando te conviene y litigando cuando es necesario.',
    why: 'Muchas disputas pueden resolverse antes de llegar al tribunal. Evaluamos cada caso buscando el camino más rápido y económico hacia una solución.',
    offer: [
      { t: 'Reclamaciones extrajudiciales', d: 'Cartas de reclamación formales y negociación para resolver antes de demandar.' },
      { t: 'Demandas civiles', d: 'Representación como demandante o demandado en los tribunales de Puerto Rico.' },
      { t: 'Cobro de dinero', d: 'Recuperación de deudas para personas y empresas.' },
      { t: 'Daños', d: 'Reclamaciones por daños derivados de incumplimiento de contrato u otra responsabilidad civil.' },
      { t: 'Procesos de tutela', d: 'Peticiones para nombrar un tutor para un menor o una persona que necesita protección.' },
    ],
    steps: [
      { t: 'Evaluación del caso', d: 'Revisamos los hechos y documentos y te explicamos tus opciones.' },
      { t: 'Estrategia', d: 'Acordamos objetivos, alcance y honorarios antes de actuar.' },
      { t: 'Negociación o radicación', d: 'Buscamos un acuerdo o radicamos la acción correspondiente.' },
      { t: 'Representación', d: 'Te representamos en cada etapa y te mantenemos informado.' },
    ],
    bring: ['Contratos, facturas o recibos', 'Cartas, correos y mensajes sobre la disputa', 'Fotos u otra evidencia', 'Nombres de las personas involucradas', 'Documentos del tribunal que hayas recibido'],
    faqs: [
      { q: '¿Todas las disputas terminan en el tribunal?', a: 'No. Muchos asuntos se resuelven con una carta de reclamación y negociación. Recomendamos litigar solo cuando es en tu beneficio.' },
      { q: 'Me demandaron. ¿Qué hago?', a: 'Contáctanos de inmediato. Los términos para contestar una demanda son cortos y actuar temprano protege tus opciones.' },
      { q: '¿Cuánto dura un caso civil?', a: 'Varía según la complejidad del caso y el calendario del tribunal. Te damos un estimado realista luego de revisar tu asunto.' },
    ],
  },
  family: {
    seo: {
      title: 'Derecho de Familia y Bodas Civiles en Puerto Rico | CNC Law Firm',
      description: 'Bodas civiles, capitulaciones matrimoniales, divorcio y tutela en Puerto Rico. Orientación discreta y bilingüe para parejas y familias.',
    },
    intro: 'Los momentos más importantes de la vida merecen una guía legal cuidadosa. Desde oficiar tu boda civil hasta atender un divorcio o una tutela, actuamos con discreción, sensibilidad y claridad en cada paso.',
    why: '¿Planificas una boda en Puerto Rico desde el exterior? Coordinamos la ceremonia legal y los documentos necesarios para que tu matrimonio sea válido desde el primer día.',
    offer: [
      { t: 'Ceremonias de boda civil', d: 'Ceremonias legales oficiadas por abogada-notaria, incluyendo bodas destino.' },
      { t: 'Capitulaciones matrimoniales', d: 'Acuerdos sobre el régimen de bienes otorgados antes de la boda.' },
      { t: 'Divorcio', d: 'Divorcio por consentimiento mutuo y acuerdos relacionados, con discreción.' },
      { t: 'Tutela', d: 'Protección de menores y adultos que necesitan un tutor legal.' },
    ],
    steps: [
      { t: 'Consulta privada', d: 'Escuchamos tu situación en confianza.' },
      { t: 'Plan y documentos', d: 'Te explicamos los requisitos y preparamos los documentos.' },
      { t: 'Ceremonia o radicación', d: 'Oficiamos la ceremonia o radicamos ante el tribunal.' },
      { t: 'Seguimiento', d: 'Seguimos disponibles hasta que todo esté completo.' },
    ],
    bring: ['Identificación de ambas partes', 'Certificados de nacimiento', 'Constancia de matrimonio o divorcio previo, si aplica', 'Fecha y lugar propuestos (bodas)', 'Información sobre hijos y bienes (divorcio)'],
    faqs: [
      { q: '¿Pueden oficiar nuestra boda destino en Puerto Rico?', a: 'Sí. Oficiamos ceremonias civiles y te orientamos con anticipación sobre la licencia y los documentos requeridos.' },
      { q: '¿Cuándo se firman las capitulaciones?', a: 'En Puerto Rico, las capitulaciones deben otorgarse antes del matrimonio. Planifica con tiempo para revisarlas con calma.' },
      { q: '¿Mi información es confidencial?', a: 'Sí. Los asuntos de familia se atienden con total discreción.' },
    ],
  },
  admin: {
    seo: {
      title: 'Abogada de Derecho Administrativo en Puerto Rico | Agencias y Municipios | CNC Law Firm',
      description: 'Representación ante agencias administrativas y municipios de Puerto Rico: radicaciones, vistas, reconsideraciones y apelaciones.',
    },
    intro: 'Las agencias y los municipios toman decisiones que pueden afectar tus permisos, licencias, contratos y negocio. Representamos a personas, empresas y entidades públicas y privadas en radicaciones, vistas y apelaciones.',
    why: 'Los procesos administrativos tienen términos estrictos. Actuar temprano — sobre todo para pedir reconsideración — puede marcar la diferencia.',
    offer: [
      { t: 'Representación ante agencias', d: 'Radicaciones, contestaciones y comunicaciones ante agencias de Puerto Rico.' },
      { t: 'Asuntos municipales', d: 'Asuntos ante municipios, incluyendo permisos, contratos y notificaciones.' },
      { t: 'Vistas administrativas', d: 'Preparación y representación en vistas formales e informales.' },
      { t: 'Reconsideraciones y apelaciones', d: 'Impugnación de decisiones adversas dentro de los términos aplicables.' },
    ],
    steps: [
      { t: 'Revisión de la notificación', d: 'Revisamos la decisión o notificación y confirmamos los términos.' },
      { t: 'Estrategia', d: 'Definimos la mejor vía y los documentos necesarios.' },
      { t: 'Radicación y vista', d: 'Radicamos y te representamos ante la agencia.' },
      { t: 'Decisión y próximos pasos', d: 'Te explicamos el resultado y las opciones, incluida la apelación.' },
    ],
    bring: ['La notificación, decisión o carta recibida', 'Permisos, licencias o contratos involucrados', 'Correspondencia previa con la agencia', 'Fechas y términos relevantes', 'Documentos corporativos, si representas una entidad'],
    faqs: [
      { q: '¿Cuánto tiempo tengo para impugnar una decisión?', a: 'Los términos son cortos y varían según la agencia y el proceso. Contáctanos tan pronto recibas la notificación.' },
      { q: '¿Representan empresas y entidades públicas?', a: 'Sí. Representamos a personas, empresas y entidades públicas y privadas.' },
      { q: '¿Puede atenderse a distancia?', a: 'Muchas gestiones se coordinan virtualmente; algunas vistas pueden requerir comparecencia. Te lo indicamos con anticipación.' },
    ],
  },
};

export const SERVICE_PAGES: Record<Lang, Record<PracticeKey, ServicePage>> = { en, es };
