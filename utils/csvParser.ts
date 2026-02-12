import { Course } from '../types';

// The raw CSV data provided in the prompt
const RAW_CSV_DATA = `Number;Market;Email Address - Event Details Contact;Focus Area;Audience (You can select more than one option);How many attendees do you expect?;Approximate Start Date;Length of Event;Name of Event;Does this contain watsonx?;Is this a user group meeting?;Projected Cost in US dollars;Market Leader Comments/Notes;Requested;Registration Link
1;SPGI;david.ezagury@ibm.com;Automation;Customers, Business Partners;10-20;March;0.5 day;Opentelemetry with Instana;;No;;;;
2;SPGI;"julian.garcia@es.ibm.com; david.nunez@ibm.com";Automation;Customers, Business Partners;20-40;11/03/2026;0.5 day;AI for Networking, an IBM TechXchange Workshop;No;No;500;;Yes;https://www.ibm.com/events/reg/flow/ibm/K65HDZMB/landing/page/landing
3;SPGI;"julian.garcia@es.ibm.com; david.nunez@ibm.com";Automation;Customers;20-40;29/04/2026;0.5 day;Trusteer Connect Day, an IBM TechXchange Workshop;No;No;1.000;;Yes;
4;SPGI;yohan.bensoussan@ibm.com;Data and AI;BP, Customers;20-40;April;1 day;The BOB Challenge;No;No;2.000; ;;
5;SPGI;Richard.podlas@ibm.com;Data and AI;Customers, Business Partners;20-40;March;0.5 day;Quantum Safe For the Financial Sector;;;;;;
6;SPGI;Richard.podlas@ibm.com;Data and AI;Customers;20-40;March;1 day;DataStax - Scale for the sky;;;;;;
7;SPGI;Matan.Dadon@ibm.com;Automation;Customers;20-40;March;0.5 day;Integration Workshop (webMethods);;;;;;
8;SPGI;Matan.Dadon@ibm.com;Automation;Customers;20-40;March;0.5 day;CISOs raund table (Verify, Vault, Data Security);;;;;;
9;SPGI;Matan.Dadon@ibm.com;Automation;Customers, Business Partners;40-75;April;0.5 day;DevOps Bootcamp - Including Hand On (Terraform, Vault, Instana);;;;;;
10;SPGI;yoramb@il.ibm.com;Data and AI;Customers;20-40;April;0.5 day;Data Security;;;;;;
11;SPGI;gemma_munoz@es.ibm.com;Z;Customers;20-40;12/02/2026;1 day;IBM Data&AI on z/OS, an IBM TechXchange Workshop;Yes;No;1.750;;Yes;https://www.ibm.com/events/reg/flow/ibm/YXCNXJMB/landing/page/landing
12;SPGI;yuval_feller@il.ibm.com;Data and AI;Customers;20-40;April;0.5 day;IBM Data Security for Banking Regulatory Requirements;;;;;;
13;SPGI;yuval_feller@il.ibm.com;Automation;Customers;20-40;April;0.5 day;IBM Verify for strengthening identity security in a hybrid world;;;;;;
14;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-40;April;Less than 0.5 day;IA Segura y Responsable: Cumple el EU AI Act y Minimiza Riesgos;Yes;No;;;;
15;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-41;April;0.5 day;Create Predictive Models Visually with SPSS;No;No;;;;
16;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-42;April;1 day;Del Papel a la Realidad: Automatización End-to-End;No;No;;;;
17;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-43;April;0.5 day;Business Automation con IA: La Nueva Generación de Procesos;Yes;No;;;;
18;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-43;April;0.5 day;Lleva tus Decisiones Operativas al Siguiente Nivel con CPLEX y Bob;Yes;No;;;;
19;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-43;April;0.5 day;De Asistentes a Agentes: La Revolución de la Productividad con IA;Yes;No;;;;
20;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-43;April;Less than 0.5 day;Gobernar Excel Empresarial con IBM Planning Analytics;No;No;;;;
21;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-43;April;0.5 day;Workspace Reports and Analysis Deep Dive;No;No;;;;
22;SPGI;miguelangel.gonzalez@ibm.com;Data and AI;Customers;20-44;April;Less than 0.5 day;Evaluación y monitorización continua de sistemas de IA con watsonx.governance;Yes;No;;;;
23;SPGI;"javier.garcia-samaniego@ibm.com; Luis.Gomez@ibm.com";Data and AI;Customers;10-20;May;0.5 day;Data Mesh Approach, creation of governed data products with watsonx.data intelligence;Yes;;;;;
25;SPGI;"irene.marquet@ibm.com; George.Cassar@ibm.com";Data and AI;Customers, Business Partners;10-20;September;0.5 day;Federated analytics, FinOps, embedded BI, and engine‑level telemetry in the corporate lakehouse;Yes;;;;;
26;SPGI;ivancantero@es.ibm.com;Data and AI;Customers, Business Partners;20-40;March;0.5 day;PQC / Quantum Safe: Introducción, retos y soluciones;;;;;;
27;SPGI;"marco.langa.penalba@ibm.com; sonia_marquez@es.ibm.com; antonio.palacios@ibm.com";Data and AI;Customers, Business Partners;20-40;September;1 day;Guardium User Group;No;Yes;;;;
28;SPGI;"marco.langa.penalba@ibm.com; sonia_marquez@es.ibm.com; antonio.palacios@ibm.com";Data and AI;Business Partners;20-40;June;2 days;Guardium tech training - SMEs;No;No;;;;
29;SPGI;"marco.langa.penalba@ibm.com; sonia_marquez@es.ibm.com; antonio.palacios@ibm.com";Data and AI;Customers;10-20;April;0.5 day;Get the most of Guardium Assessment;No;No;;;;
30;SPGI;"marco.langa.penalba@ibm.com; sonia_marquez@es.ibm.com; antonio.palacios@ibm.com";Data and AI;Customers;20-40;April;1 day;Data Security for Z;No;No;;;;
31;SPGI;"robert.kende@es.ibm.com; julio.cesar.casas@ibm.com";Data and AI;Customers, Business Partners;10-20;June;0.5 day;Master Data for the AI Agent Era: From Fragmented Sources to Seamless AI Access;Yes;No;;;;
32;SPGI;George.diasakos@ibm.com;Power;Business Partners;20-40;5/5/26;1 day;PowerVS enablement;No;No;;;;
33;SPGI;stoupage@gr.ibm.com;Power;Customers, Business Partners;30-50;16/9/2026;1 day;Power11 BP - Customer enablement - Final name to de decided;No;No;;;;
34;SPGI;George.Mavrovitis@ibm.com;Automation;Customers, Business Partners;20-40;May;1 day;Instana, Turbonomic & AIOps - end to end insights;No;No;;;;
35;SPGI;"Georgia.Karoutsou1@ibm.com; menicos.mavrommatis1@ibm.com";Automation;Customers, Business Partners;20-40;March;1 day;Hashicorp - The automation story;No;No;;;;
36;SPGI;"arancha_ocana@es.ibm.com; irene.marquet@ibm.com";Data and AI;Customers, Business Partners;20-40;September;1 day;Unified batch and real-time data integration and observability across structured, semi‑structured, and unstructured data;Yes;No;;;;
37;SPGI;hugo.fernandez@es.ibm.com;Z;Customers;20-40;Sep;1 day;Mainframe applications Integration in the hybrid cloud ;No;No;1250;;;
38;SPGI;sandralazaroperez@ibm.com;Z;Customers;20-40;Apr;1 day;Mainframe applications modernization with DevOps and AI tools ;Yes;No;1250;;;
39;SPGI;Jessica.Martin@ibm.com;Z;Customers;20-40;Oct;1 day;What's new whith AIOps in the mainframe;Yes;No;1250;;;
40;SPGI;Francisco.Mesa@ibm.com;Z;Customers;20-40;June;1 day;Protecting your most valueable asset: zSecurity;No;No;1250;;;
41;SPGI;Andrea.Nunez@ibm.com;Z;Customers;20-40;March;1 day;Meet LinuxONE;No;No;1250;;;
42;SPGI;cristinabm@es.ibm.com;Z;Customers;20-40;July;1 day;Do more at the core with IBM z17 & LinuxONE in Lisbon;Yes;No;1250;;;
43;SPGI;cristinabm@es.ibm.com;Z;Customers;20-40;July;1 day;Do more at the core with IBM z17 & LinuxONE in Athens;Yes;No;1250;;;
44;SPGI;HABANI@il.ibm.com;Z;Customers;20-40;Nov;1 day;Do more at the core with IBM z17 & LinuxONE in Tel Aviv;Yes;No;1250;;;
45;SPGI;DEVOLDWI@gr.ibm.com;Z;Customers;20-40;Dec;1 day;Netview, System Automation and Workload Scheduler update;No;No;1250;;;
46;SPGI;Pablo.Paniagua1@ibm.com;Z;Customers;20-40;May;1 day;Getting the best of OCP with LinuxONE;No;No;1250;;;
47;SPGI;gemma_munoz@es.ibm.com;Z;Customers;10-20;March;1 day;IBM Data&AI on z/OS, an IBM TechXchange Workshop in Barcelona;Yes;No;750;;Yes;
48;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;April;1 day;iPaaS;;;;;;
49;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;March;1 day;Observabilidad end2end - Instana, SevOne, Concert;;;;;;
50;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;May;1 day;Zerotouch IT Operations - Terraform, Ansible, Turbonomic, Instana, Concert;;;;;;
51;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;March;1 day;Gestión financiera del IT - Apptio;;;;;;
52;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;March;1 day;FinOps - Cloudability, Kubecost, Turbonomic;;;;;;
53;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;March;1 day;Integración Híbrida - IWHI;;;;;;
54;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;May;1 day;Gestión de Activos - Maximo;;;;;;
55;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;May;1 day;Gestión de identidades, accesos y secretos - Verify y Vault;;;;;;
56;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;July;1 day;Modernización aplicacional - WAS/Liberty/CP4App;;;;;;
57;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;May;1 day;GitLab;;;;;;
58;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;May;1 day;AI Powered DevOps - BOB;;;;;;
59;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;July;1 day;B2B & MFT;;;;;;
60;SPGI;"franclim.bento@pt.ibm.com; Luis.Bazo@ibm.com";Automation;Customers, Business Partners;10-20;July;1 day;Confluent (H2);;;;;;
61;SPGI;jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;May;0.5 day;Greece, IBM Integration Key Enabler for Innovation?;No;;1000;;;
62;SPGI;jose.miguel.indave@ibm.com;Automation;Customers;20-40;May;0.5 day; API Management Customer forum, 28 mayo? ;No;;1000;;;
63;SPGI;jose.miguel.indave@ibm.com;Automation;Customers;20-40;September;0.5 day;Portugal, IBM Integration Key Enabler for Innovation;No;;1000;;;
64;SPGI;jose.miguel.indave@ibm.com;Automation;Customers;20-40;Octubre;0.5 day;Sterling Customer forum;No;;1000;;;
65;SPGI;jose.miguel.indave@ibm.com;Automation;Customers;20-40;Noviembre;0.5 day;Safer Payments Customer forum;No;;1000;;;
66;SPGI;jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;April;0.5 day;Hybrid API Management with IBM: 16 Abril​;No;;;;;
67;SPGI;jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;September;0.5 day;iPaaS (APIs & Connect) hands-on workshops, Septiembre​;No;;;;;
68;SPGI;jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;May;0.5 day;Greece, iPaaS (APIs & Connect) hands-on workshops, Q2?​;No;;;;;
69;SPGI;jose.miguel.indave@ibm.com;Automation;Customers, Business Partners;20-40;April;0.5 day;B2B & MFT workshops: 28 Abril;No;;;;;
70;SPGI;"miguelalcala@ibm.com; Javier.Frances@ibm.com";Data and AI;Customers, Business Partners;20-40;May;0.5 day;IBM Bob in action;No;No;;;;`;

const monthMap: Record<string, number> = {
  jan: 0, january: 0, enero: 0,
  feb: 1, february: 1, febrero: 1,
  mar: 2, march: 2, marzo: 2,
  apr: 3, april: 3, abril: 3,
  may: 4, mayo: 4,
  jun: 5, june: 5, junio: 5,
  jul: 6, july: 6, julio: 6,
  aug: 7, august: 7, agosto: 7,
  sep: 8, sept: 8, september: 8, septiembre: 8,
  oct: 9, october: 9, octubre: 9,
  nov: 10, november: 10, noviembre: 10,
  dec: 11, december: 11, diciembre: 11
};

const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date(2027, 0, 1); // Future default if missing
  
  const clean = dateStr.trim().toLowerCase();
  const year = 2026; // Default year per requirements

  // Regex for DD/MM/YYYY or D/M/YY
  const slashMatch = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slashMatch) {
    const d = parseInt(slashMatch[1], 10);
    const m = parseInt(slashMatch[2], 10) - 1;
    let y = parseInt(slashMatch[3], 10);
    if (y < 100) y += 2000;
    return new Date(y, m, d);
  }

  // Check for month names in English or Spanish
  for (const [mName, mIndex] of Object.entries(monthMap)) {
    if (clean.includes(mName)) {
      // If a number is also present, try to extract it as day, otherwise 1st
      const dayMatch = clean.match(/(\d{1,2})/);
      const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;
      return new Date(year, mIndex, day);
    }
  }

  // Fallback to end of list
  return new Date(year + 1, 0, 1);
};

export const getParsedCourses = (): Course[] => {
  const lines = RAW_CSV_DATA.trim().split('\n');
  const courses: Course[] = [];

  // Helper to split CSV line respecting quotes
  const splitCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ';' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    if (cols.length < 5) continue; // Skip malformed lines

    const startDateRaw = cols[6]?.trim() || '';
    const title = cols[8]?.trim() || '';
    const notes = cols[12]?.trim() || '';
    const contactEmail = cols[2]?.replace(/"/g, '').trim() || '';

    courses.push({
      id: cols[0]?.trim(),
      market: cols[1]?.trim(),
      contactEmail: contactEmail,
      focusArea: cols[3]?.trim(),
      audience: cols[4]?.trim(),
      expectedAttendees: cols[5]?.trim(),
      startDate: startDateRaw,
      duration: cols[7]?.trim(),
      title: title,
      containsWatsonX: cols[9]?.toLowerCase() === 'yes',
      isUserGroup: cols[10]?.toLowerCase() === 'yes',
      projectedCost: cols[11]?.trim(),
      notes: notes,
      requested: cols[13]?.trim(),
      registrationLink: cols[14]?.trim() || undefined,
      parsedDate: parseDate(startDateRaw)
    });
  }

  return courses;
};

export const COURSES = getParsedCourses();