console.log("SCRIPT STARTED");
/* =====================================================
   LANGUAGE
===================================================== */

let currentLanguage = localStorage.getItem("language") || "fr";
/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL = "https://zncvuunrgreacyxfdell.supabase.co";
const SUPABASE_KEY = "sb_publishable_n3bdSuDm_KSGjys4jjLhKg_vvER9Wm9";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const REQUEST_TOKEN_KEY = "student_request_token";

let projectsAuthorized = false;
let currentAIProject = null;

/* =====================================================
   PROJECTS DATA
===================================================== */

const projects = [

{
    id: 1,

    icon: "🤖🚗",

    fr: {
        title: "Voiture Robot",

        description:
            "La voiture robot est un projet de mécatronique qui combine la mécanique, l'électronique, la programmation et l'automatisation. Le système est basé sur une carte Arduino Uno qui joue le rôle de cerveau du robot. Elle reçoit les informations provenant des capteurs, les analyse selon le programme chargé et commande ensuite les moteurs à travers un driver L298N. La voiture peut avancer, reculer, tourner à droite, tourner à gauche et s'arrêter. Grâce au capteur ultrasonique HC-SR04, elle peut également mesurer la distance qui la sépare d'un obstacle et prendre une décision automatiquement. Ce projet permet de comprendre concrètement comment un système robotique transforme une information provenant du monde réel en une action mécanique.",

        tags: [
            "Arduino Uno",
            "Moteurs DC",
            "L298N",
            "HC-SR04",
            "Robotique",
            "Mécatronique"
        ],

        material: [
            "Arduino Uno",
            "2 moteurs à courant continu (DC)",
            "2 roues motrices",
            "1 roue folle / roue universelle",
            "Driver moteur L298N",
            "Capteur ultrasonique HC-SR04",
            "Châssis pour voiture robot",
            "Batterie ou alimentation adaptée",
            "Câbles Dupont",
            "Interrupteur",
            "Vis et entretoises",
            "Câbles d'alimentation",
            "Ordinateur avec Arduino IDE"
        ],

        wiring:
            "Le système électronique est organisé autour de l'Arduino Uno. Les deux moteurs DC ne doivent pas être alimentés directement par les broches de l'Arduino, car celles-ci ne peuvent pas fournir le courant nécessaire aux moteurs. Le driver L298N est donc utilisé comme interface de puissance entre l'Arduino et les moteurs. Le moteur gauche est connecté à une sortie du premier canal du L298N et le moteur droit au deuxième canal. Les entrées de commande du L298N sont reliées à plusieurs broches numériques de l'Arduino. Le HC-SR04 possède quatre connexions principales : VCC, GND, TRIG et ECHO. VCC est relié à l'alimentation 5 V, GND au GND commun, tandis que TRIG et ECHO sont reliés à deux broches numériques de l'Arduino. Il est essentiel que l'Arduino, le L298N et les différents éléments électroniques partagent une masse commune lorsque cela est nécessaire. L'alimentation des moteurs doit être adaptée à leur tension nominale et ne doit pas être choisie au hasard.",

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "L'Arduino Uno constitue le cerveau du robot. Il exécute le programme et décide de l'action à effectuer. Il reçoit les informations du capteur ultrasonique puis commande les entrées du driver L298N. L'Arduino ne fournit pas directement la puissance nécessaire aux moteurs : il envoie principalement des signaux de commande."
            },

            {
                name: "Moteurs DC",
                explanation:
                    "Les moteurs à courant continu transforment l'énergie électrique en mouvement mécanique. Chaque moteur entraîne une roue. En inversant le sens de commande d'un moteur, on peut modifier son sens de rotation. La différence de fonctionnement entre les deux moteurs permet au robot d'avancer, de reculer ou de tourner."
            },

            {
                name: "Driver L298N",
                explanation:
                    "Le L298N est un module de commande de moteurs. Il sert d'intermédiaire entre l'Arduino et les moteurs. Il permet de contrôler le sens de rotation des moteurs et, selon le montage et le programme, leur vitesse. Son utilisation protège également les sorties de l'Arduino contre la demande de courant importante des moteurs."
            },

            {
                name: "HC-SR04",
                explanation:
                    "Le HC-SR04 est un capteur ultrasonique utilisé pour mesurer une distance. L'Arduino envoie une impulsion sur la broche TRIG. Le capteur émet alors une onde ultrasonique et attend son retour. Le temps nécessaire à l'aller-retour du signal permet au programme d'estimer la distance entre le robot et l'obstacle."
            },

            {
                name: "Châssis",
                explanation:
                    "Le châssis constitue la structure mécanique du robot. Il supporte l'Arduino, le driver, la batterie, les moteurs et le capteur. Sa rigidité et la position des composants influencent directement la stabilité et le comportement de la voiture."
            },

            {
                name: "Alimentation",
                explanation:
                    "La source d'alimentation fournit l'énergie électrique au système. Les moteurs peuvent demander un courant important, notamment au démarrage. Il faut donc choisir une alimentation compatible avec la tension des moteurs et avec le montage électronique. Il ne faut jamais utiliser une tension supérieure aux limites des composants."
            }
        ],

        principle:
            "Le fonctionnement du robot repose sur une boucle de décision. Tout d'abord, le HC-SR04 mesure la distance devant la voiture. L'Arduino récupère cette information et la compare à une distance limite définie dans le programme. Si aucun obstacle proche n'est détecté, l'Arduino commande au L298N de faire avancer les deux moteurs. Si un obstacle est détecté à une distance inférieure au seuil choisi, le robot arrête les moteurs puis effectue une manœuvre, par exemple un recul suivi d'une rotation. Le robot recommence ensuite à mesurer la distance. Cette succession de mesures, décisions et actions constitue le comportement autonome du robot.",

        mechanicalAssembly:
            "La fabrication commence par le châssis. Les deux moteurs doivent être fixés solidement sur les côtés du châssis afin que leurs axes soient correctement alignés avec les roues. Une roue folle peut être installée à l'avant ou à l'arrière pour maintenir l'équilibre de la voiture. L'Arduino et le L298N doivent être fixés de manière à éviter qu'ils ne bougent pendant le déplacement. Le capteur HC-SR04 doit être placé à l'avant du robot et orienté vers la zone que la voiture doit surveiller. Il faut également laisser suffisamment d'espace pour les câbles et éviter qu'ils ne touchent les roues ou les parties mobiles. La batterie doit être correctement maintenue afin qu'elle ne se déplace pas lorsque le robot accélère ou tourne.",

        electricalAssembly:
            "Après le montage mécanique, on réalise le câblage électronique. Les moteurs sont d'abord connectés aux sorties moteur du L298N. Les entrées de commande du L298N sont ensuite reliées aux broches numériques choisies sur l'Arduino. Le HC-SR04 est connecté avec VCC, GND, TRIG et ECHO. Avant de mettre sous tension, chaque connexion doit être vérifiée. Il faut particulièrement contrôler la polarité de l'alimentation, les connexions GND et l'absence de court-circuit. L'alimentation des moteurs doit être adaptée au moteur et au module utilisé. Il est recommandé de faire les premiers tests avec le robot surélevé afin que les roues ne touchent pas le sol.",

        wiringDetails: [
            "Relier le moteur gauche aux sorties du canal A du L298N.",
            "Relier le moteur droit aux sorties du canal B du L298N.",
            "Relier les entrées IN1 et IN2 du L298N à deux sorties numériques de l'Arduino.",
            "Relier les entrées IN3 et IN4 du L298N à deux autres sorties numériques.",
            "Relier le GND de l'Arduino au GND du système lorsque le montage l'exige.",
            "Relier VCC du HC-SR04 à une alimentation compatible.",
            "Relier GND du HC-SR04 au GND commun.",
            "Relier TRIG du HC-SR04 à une broche numérique.",
            "Relier ECHO du HC-SR04 à une autre broche numérique.",
            "Vérifier toutes les connexions avant de brancher la batterie."
        ],

        algorithm:
            "L'algorithme peut être résumé ainsi : démarrer le système, initialiser les broches, mesurer la distance, analyser la valeur obtenue, puis choisir une action. Si la distance est suffisamment grande, les deux moteurs tournent dans le sens permettant d'avancer. Si la distance devient trop faible, les moteurs sont arrêtés pour éviter une collision. Le robot peut ensuite reculer pendant une courte durée puis tourner afin de chercher un chemin libre. Une nouvelle mesure est ensuite effectuée. Cette boucle se répète continuellement tant que le robot est alimenté.",

        programming:
            "La programmation de l'Arduino doit être organisée en plusieurs parties. Dans la fonction setup(), les broches utilisées pour les moteurs et le capteur sont configurées comme entrées ou sorties. La communication série peut également être activée afin d'afficher les distances mesurées pendant les tests. Une fonction de mesure peut ensuite envoyer une impulsion sur TRIG et mesurer la durée reçue sur ECHO. Cette durée est convertie en distance. Des fonctions séparées peuvent être utilisées pour avancer, reculer, tourner à gauche, tourner à droite et arrêter les moteurs. Dans loop(), le programme mesure continuellement la distance et choisit l'action correspondant à la situation. Cette organisation rend le programme plus facile à comprendre, à tester et à modifier.",

        steps: [
            "1. Étudier le fonctionnement général du robot avant de commencer le montage.",
            "2. Préparer le châssis et vérifier que toutes les pièces mécaniques sont disponibles.",
            "3. Fixer solidement les deux moteurs DC sur le châssis.",
            "4. Installer les roues sur les axes des moteurs et vérifier qu'elles tournent librement.",
            "5. Installer la roue folle afin de maintenir l'équilibre du robot.",
            "6. Choisir une position stable pour l'Arduino Uno.",
            "7. Fixer le module L298N dans une zone accessible pour faciliter les tests.",
            "8. Installer le HC-SR04 à l'avant du robot avec une orientation correcte.",
            "9. Installer la batterie dans une position stable et sécurisée.",
            "10. Connecter les deux moteurs au L298N.",
            "11. Connecter les entrées de commande du L298N aux broches de l'Arduino.",
            "12. Connecter VCC, GND, TRIG et ECHO du HC-SR04.",
            "13. Vérifier toutes les connexions avant d'alimenter le système.",
            "14. Tester séparément le fonctionnement du moteur gauche.",
            "15. Tester séparément le fonctionnement du moteur droit.",
            "16. Vérifier que les deux moteurs tournent dans le sens souhaité.",
            "17. Tester le HC-SR04 et afficher les distances sur le moniteur série.",
            "18. Charger le programme de commande dans l'Arduino.",
            "19. Tester l'avance et l'arrêt du robot sur une surface dégagée.",
            "20. Tester la marche arrière.",
            "21. Tester les rotations à gauche et à droite.",
            "22. Tester la détection d'un obstacle placé devant le robot.",
            "23. Régler le seuil de distance selon le comportement souhaité.",
            "24. Tester le robot plusieurs fois afin de vérifier la stabilité de son comportement.",
            "25. Fixer définitivement les câbles et les composants après validation du montage."
        ],

        testing:
            "Les tests doivent être réalisés progressivement. Il ne faut pas commencer directement par un test autonome complet. Premièrement, vérifier l'alimentation et l'état des composants. Deuxièmement, tester chaque moteur séparément. Troisièmement, vérifier le capteur ultrasonique en observant les distances dans le moniteur série. Quatrièmement, tester les commandes de déplacement sans obstacle. Enfin, placer un obstacle devant le robot et vérifier que le programme détecte correctement sa présence et déclenche la manœuvre prévue. Pendant les premiers essais, il est préférable de maintenir les roues hors du sol ou de rester prêt à couper l'alimentation en cas de comportement inattendu.",

        calibration:
            "La calibration consiste principalement à adapter le comportement du robot à ses composants réels. Les deux moteurs peuvent ne pas avoir exactement la même vitesse pour une même commande. Le robot peut donc dévier légèrement lorsqu'il avance. Il peut être nécessaire d'ajuster les commandes de vitesse ou la durée de fonctionnement de chaque moteur. Le capteur ultrasonique doit également être testé à différentes distances afin de vérifier que les mesures sont cohérentes. Le seuil de détection des obstacles doit être choisi en fonction de la vitesse du robot, de sa taille et de la distance nécessaire pour effectuer une manœuvre.",

        commonProblems: [
            {
                problem: "Les moteurs ne tournent pas.",
                solution:
                    "Vérifier l'alimentation du L298N, les connexions des moteurs, les connexions IN1/IN2/IN3/IN4 et le programme. Vérifier également que la source d'alimentation peut fournir le courant nécessaire."
            },
            {
                problem: "Un seul moteur fonctionne.",
                solution:
                    "Contrôler le câblage du moteur concerné et le canal correspondant du L298N. Vérifier également les broches utilisées dans le programme."
            },
            {
                problem: "La voiture avance dans une mauvaise direction.",
                solution:
                    "Le sens de rotation d'un moteur peut être inversé. Vérifier les connexions du moteur et adapter la logique de commande dans le programme."
            },
            {
                problem: "La voiture tourne toute seule.",
                solution:
                    "Les deux moteurs peuvent avoir des vitesses différentes. Vérifier les moteurs, les roues et les paramètres de vitesse."
            },
            {
                problem: "Le HC-SR04 donne des mesures incorrectes.",
                solution:
                    "Vérifier VCC, GND, TRIG et ECHO. Vérifier également que le capteur est correctement orienté et que les objets testés se trouvent dans une zone adaptée à la mesure."
            },
            {
                problem: "Le robot redémarre lorsque les moteurs démarrent.",
                solution:
                    "Les moteurs peuvent provoquer une chute de tension ou des perturbations électriques. Vérifier l'alimentation, les masses communes et la séparation correcte entre la puissance des moteurs et la logique de commande."
            },
            {
                problem: "Le robot détecte l'obstacle trop tard.",
                solution:
                    "Augmenter la distance seuil dans le programme et vérifier la vitesse du robot afin de lui laisser suffisamment de temps pour réagir."
            }
        ],

        safety:
            "Avant toute intervention sur le câblage, couper l'alimentation du robot. Ne jamais modifier les connexions alors que les moteurs sont alimentés. Vérifier la polarité de la batterie et respecter les tensions admissibles des composants. Maintenir les doigts, câbles et vêtements éloignés des roues et des parties mobiles pendant les tests. Une batterie qui chauffe, gonfle ou présente un comportement anormal ne doit pas être utilisée. Les premiers essais doivent être réalisés dans un espace dégagé et sous surveillance.",

        improvements: [
            "Ajouter un servo-moteur pour orienter le capteur ultrasonique.",
            "Ajouter plusieurs capteurs afin d'améliorer la détection des obstacles.",
            "Ajouter un système Bluetooth ou Wi-Fi pour contrôler le robot à distance.",
            "Ajouter des encodeurs sur les moteurs pour mesurer les rotations des roues.",
            "Ajouter des LED pour indiquer l'état du robot.",
            "Ajouter un écran pour afficher la distance mesurée et l'état du système.",
            "Remplacer progressivement le contrôle simple par un système de navigation plus avancé.",
            "Ajouter une gestion de batterie afin de surveiller le niveau d'alimentation.",
            "Améliorer le châssis et la répartition du poids pour obtenir un robot plus stable."
        ],

        educational:
            "Ce projet permet à l'étudiant de découvrir plusieurs domaines de la mécatronique dans un seul système. Il apprend la différence entre un signal de commande et une puissance électrique, comprend le rôle d'un driver moteur, découvre le fonctionnement d'un capteur ultrasonique et apprend à transformer une mesure en décision logicielle. Le projet permet également de comprendre la relation entre mécanique, électronique et programmation : les moteurs produisent le mouvement, les capteurs observent l'environnement, l'Arduino traite les informations et le programme détermine le comportement du robot.",

        conclusion:
            "La voiture robot constitue une excellente introduction à la robotique mobile. Sa réalisation permet de passer progressivement d'un simple montage électronique à un système autonome capable de percevoir son environnement et de prendre des décisions. Une fois le prototype fonctionnel, il peut être amélioré avec de nouveaux capteurs, une communication sans fil, des encodeurs et des algorithmes de navigation plus avancés."
    },

    ar: {

        title: "السيارة الروبوتية",

        description:
            "السيارة الروبوتية هي مشروع في الميكاترونيك يجمع بين الميكانيك والإلكترونيات والبرمجة والتحكم الآلي. تعتمد السيارة على لوحة Arduino Uno التي تعمل كعقل للروبوت، حيث تستقبل المعلومات من الحساسات وتعالجها حسب البرنامج ثم ترسل أوامر إلى المحركات عن طريق Driver L298N. تستطيع السيارة التقدم والتراجع والدوران يمينًا ويسارًا والتوقف. وباستعمال حساس الموجات فوق الصوتية HC-SR04 يمكن للروبوت قياس المسافة بينه وبين العوائق واتخاذ قرار تلقائي لتجنب الاصطدام. هذا المشروع يسمح للطالب بفهم كيفية تحويل المعلومات القادمة من العالم الحقيقي إلى أوامر وحركة ميكانيكية.",

        tags: [
            "Arduino Uno",
            "محركات DC",
            "L298N",
            "HC-SR04",
            "روبوتيك",
            "ميكاترونيك"
        ],

        material: [
            "Arduino Uno",
            "محركان كهربائيان DC",
            "عجلتان للمحركات",
            "عجلة حرة / عجلة توازن",
            "Driver L298N",
            "حساس الموجات فوق الصوتية HC-SR04",
            "هيكل السيارة",
            "بطارية أو مصدر طاقة مناسب",
            "أسلاك Dupont",
            "مفتاح تشغيل وإيقاف",
            "براغي ومثبتات",
            "أسلاك تغذية",
            "حاسوب وبرنامج Arduino IDE"
        ],

        wiring:
            "تتمحور الدارة الإلكترونية حول Arduino Uno الذي يمثل عقل الروبوت. لا يجب تشغيل محركات DC مباشرة من منافذ Arduino لأن هذه المنافذ لا تستطيع توفير التيار الكبير الذي تحتاجه المحركات، لذلك يتم استعمال Driver L298N كوسيط بين Arduino والمحركات. يتم توصيل المحرك الأول بقناة من قنوات L298N والمحرك الثاني بالقناة الثانية. أما مداخل التحكم في L298N فتتصل بمنافذ رقمية في Arduino. يحتوي HC-SR04 على أربع توصيلات أساسية: VCC وGND وTRIG وECHO. يتم توصيل VCC بالطاقة المناسبة وGND بالأرضي، بينما يتم توصيل TRIG وECHO بمنافذ رقمية في Arduino. يجب الانتباه إلى وجود أرضي مشترك عند الحاجة والتأكد من أن مصدر طاقة المحركات مناسب لجهدها.",

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "Arduino Uno هو عقل السيارة الروبوتية. يقوم بتشغيل البرنامج واستقبال معلومات الحساسات واتخاذ القرار ثم إرسال أوامر التحكم إلى Driver L298N. لا يتم استعمال منافذ Arduino لتغذية المحركات مباشرة، وإنما لإرسال إشارات التحكم."
            },

            {
                name: "محركات DC",
                explanation:
                    "محركات التيار المستمر تحول الطاقة الكهربائية إلى حركة ميكانيكية. كل محرك يحرك عجلة من عجلات السيارة. تغيير اتجاه دوران المحرك يسمح للسيارة بالتقدم أو الرجوع، والاختلاف بين حركة المحركين يسمح بالدوران."
            },

            {
                name: "Driver L298N",
                explanation:
                    "L298N هو وحدة للتحكم في المحركات. يعمل كوسيط بين Arduino والمحركات، ويسمح بالتحكم في اتجاه دورانها وبحسب طريقة استعماله يمكن التحكم في سرعتها. وجوده ضروري لأن المحركات تحتاج إلى تيار أكبر مما تستطيع منافذ Arduino توفيره."
            },

            {
                name: "HC-SR04",
                explanation:
                    "HC-SR04 هو حساس فوق صوتي لقياس المسافة. يرسل Arduino نبضة إلى TRIG، ثم يرسل الحساس موجة فوق صوتية وينتظر عودتها. يتم حساب المسافة اعتمادًا على الزمن الذي استغرقته الموجة في الذهاب والعودة."
            },

            {
                name: "الهيكل",
                explanation:
                    "الهيكل هو الجزء الميكانيكي الذي يحمل Arduino وDriver والبطارية والمحركات والحساس. يجب أن يكون ثابتًا وقويًا لأن وضعية المكونات وتوزيع الوزن يؤثران على استقرار السيارة."
            },

            {
                name: "مصدر الطاقة",
                explanation:
                    "البطارية أو مصدر الطاقة يوفر الكهرباء للنظام. المحركات يمكن أن تسحب تيارًا كبيرًا خصوصًا عند بداية التشغيل، لذلك يجب اختيار مصدر طاقة مناسب لجهد المحركات والتيار المطلوب، وعدم استعمال جهد أعلى من الحدود المسموح بها."
            }
        ],

        principle:
            "يعتمد عمل السيارة على حلقة مستمرة من القياس ثم اتخاذ القرار ثم تنفيذ الحركة. في البداية يقوم HC-SR04 بقياس المسافة أمام السيارة. يقرأ Arduino هذه القيمة ويقارنها بحد معين موجود في البرنامج. إذا لم يوجد عائق قريب، يرسل Arduino أوامر إلى L298N لتشغيل المحركين والتقدم إلى الأمام. إذا اكتشف الحساس عائقًا قريبًا، تتوقف المحركات ثم يمكن للسيارة الرجوع إلى الخلف والدوران للبحث عن طريق آخر. بعد ذلك تعود السيارة إلى قياس المسافة من جديد. تتكرر هذه العملية باستمرار طالما أن الروبوت يعمل.",

        mechanicalAssembly:
            "تبدأ عملية التصنيع بتحضير الهيكل. يجب تثبيت المحركين بشكل جيد على جانبي الهيكل والتأكد من أن محوريهما في الوضع الصحيح بالنسبة للعجلات. يتم تركيب عجلة حرة للمساعدة على التوازن. بعد ذلك يتم تثبيت Arduino وL298N والبطارية بطريقة تمنع تحركها أثناء السير. يجب وضع HC-SR04 في مقدمة السيارة وتوجيهه نحو المنطقة التي نريد مراقبتها. كما يجب ترتيب الأسلاك بعيدًا عن العجلات والأجزاء المتحركة. يجب تثبيت البطارية جيدًا حتى لا تتحرك عند التسارع أو الدوران.",

        electricalAssembly:
            "بعد الانتهاء من التركيب الميكانيكي تبدأ عملية التركيب الإلكتروني. يتم أولًا توصيل المحركات بمخارج L298N، ثم توصيل مداخل التحكم في L298N بالمنافذ المختارة في Arduino. بعد ذلك يتم توصيل HC-SR04 بواسطة VCC وGND وTRIG وECHO. قبل تشغيل النظام يجب مراجعة جميع التوصيلات والتأكد من عدم وجود تماس كهربائي أو عكس في القطبية. كما يجب التأكد من أن مصدر الطاقة مناسب للمحركات. من الأفضل إجراء الاختبارات الأولى والسيارة مرفوعة عن الأرض حتى لا تتحرك بشكل مفاجئ.",

        wiringDetails: [
            "توصيل المحرك الأيسر بمخارج القناة الأولى في L298N.",
            "توصيل المحرك الأيمن بمخارج القناة الثانية في L298N.",
            "توصيل IN1 وIN2 بمنافذ رقمية في Arduino.",
            "توصيل IN3 وIN4 بمنافذ رقمية أخرى.",
            "توصيل GND بشكل صحيح بين العناصر التي تحتاج أرضيًا مشتركًا.",
            "توصيل VCC الخاص بـ HC-SR04 بمصدر الطاقة المناسب.",
            "توصيل GND الخاص بـ HC-SR04 بالأرضي.",
            "توصيل TRIG بمنفذ رقمي في Arduino.",
            "توصيل ECHO بمنفذ رقمي آخر.",
            "مراجعة جميع التوصيلات قبل توصيل البطارية."
        ],

        algorithm:
            "الخوارزمية بسيطة لكنها تمثل أساس عمل الروبوتات الذاتية. يبدأ النظام بتشغيل المكونات وتهيئة المنافذ، ثم يقيس المسافة أمام السيارة. إذا كانت المسافة أكبر من الحد المحدد، تستمر السيارة في التقدم. إذا أصبحت المسافة صغيرة، تتوقف السيارة حتى لا تصطدم بالعائق، ثم يمكنها الرجوع والدوران. بعد تنفيذ المناورة يتم قياس المسافة من جديد. تستمر هذه الحلقة طوال فترة تشغيل الروبوت.",

        programming:
            "يتم تقسيم برنامج Arduino إلى عدة أجزاء حتى يكون سهل الفهم والتعديل. في setup يتم تحديد منافذ المحركات والحساس كمدخلات أو مخرجات حسب الحاجة. يمكن أيضًا تشغيل Serial Monitor لمراقبة المسافات أثناء الاختبار. بعد ذلك يمكن إنشاء دالة خاصة لقياس المسافة ودوال أخرى للتقدم والتراجع والتوقف والدوران. في loop يتم استدعاء قياس المسافة ثم مقارنة النتيجة بالحد المحدد، وبعدها يتم اختيار الحركة المناسبة. تقسيم البرنامج إلى دوال يجعل اكتشاف الأخطاء وتطوير المشروع أسهل.",

        steps: [
            "1. دراسة فكرة المشروع وفهم وظيفة كل مكون قبل بدء التركيب.",
            "2. تحضير الهيكل وجميع القطع.",
            "3. تثبيت المحركين على الهيكل.",
            "4. تركيب العجلات على محاور المحركات.",
            "5. تركيب العجلة الحرة لتحقيق التوازن.",
            "6. تثبيت Arduino Uno.",
            "7. تثبيت Driver L298N.",
            "8. تثبيت حساس HC-SR04 في مقدمة السيارة.",
            "9. تثبيت البطارية في مكان آمن وثابت.",
            "10. توصيل المحركين مع L298N.",
            "11. توصيل مداخل التحكم في L298N مع Arduino.",
            "12. توصيل VCC وGND وTRIG وECHO للحساس.",
            "13. مراجعة الدارة كاملة قبل تشغيلها.",
            "14. اختبار المحرك الأيسر.",
            "15. اختبار المحرك الأيمن.",
            "16. التأكد من اتجاه دوران المحركات.",
            "17. اختبار HC-SR04 وقراءة المسافة.",
            "18. تحميل برنامج Arduino.",
            "19. اختبار الحركة إلى الأمام.",
            "20. اختبار الرجوع إلى الخلف.",
            "21. اختبار الدوران يمينًا ويسارًا.",
            "22. وضع عائق أمام السيارة واختبار الحساس.",
            "23. ضبط المسافة التي يعتبر عندها الروبوت العائق قريبًا.",
            "24. إجراء عدة اختبارات للتأكد من استقرار النظام.",
            "25. تثبيت الأسلاك والمكونات نهائيًا بعد نجاح الاختبارات."
        ],

        testing:
            "يجب اختبار المشروع تدريجيًا وليس تشغيل كل شيء مرة واحدة. أولًا يتم التأكد من الطاقة والتوصيلات. بعد ذلك يتم اختبار كل محرك بمفرده، ثم اختبار HC-SR04 ومراقبة المسافات في Serial Monitor. بعد نجاح هذه الاختبارات يتم تجربة الحركة إلى الأمام والخلف والدوران. في المرحلة الأخيرة يوضع عائق أمام السيارة للتأكد من أن البرنامج يقرأ المسافة ويتخذ القرار الصحيح. في الاختبارات الأولى من الأفضل إبقاء العجلات مرفوعة عن الأرض حتى يمكن إيقاف النظام بسرعة عند حدوث أي حركة غير متوقعة.",

        calibration:
            "المعايرة مهمة لأن المحركين قد لا يمتلكان السرعة نفسها تمامًا. لذلك يمكن أن تنحرف السيارة قليلًا أثناء التقدم. يمكن معالجة ذلك عن طريق تعديل سرعة أحد المحركين أو إضافة تصحيح في البرنامج. كما يجب اختبار HC-SR04 على مسافات مختلفة للتأكد من أن القياسات مستقرة. ويتم اختيار مسافة اكتشاف العائق حسب سرعة السيارة والوقت اللازم لها للتوقف أو تغيير الاتجاه.",

        commonProblems: [
            {
                problem: "المحركات لا تدور.",
                solution:
                    "فحص طاقة L298N وتوصيلات المحركات ومداخل IN1 وIN2 وIN3 وIN4 والبرنامج. كما يجب التأكد من أن مصدر الطاقة يستطيع توفير التيار المطلوب."
            },
            {
                problem: "محرك واحد فقط يعمل.",
                solution:
                    "فحص أسلاك المحرك الذي لا يعمل والقناة الخاصة به في L298N ومنافذ Arduino المستخدمة في البرنامج."
            },
            {
                problem: "السيارة تتحرك في الاتجاه الخطأ.",
                solution:
                    "يمكن أن يكون اتجاه أحد المحركات معكوسًا. يجب فحص توصيلاته أو تعديل منطق التحكم في البرنامج."
            },
            {
                problem: "السيارة تنحرف أثناء التقدم.",
                solution:
                    "قد يكون هناك اختلاف في سرعة المحركين أو احتكاك ميكانيكي في إحدى العجلات. يجب فحص المحركات والعجلات وإعدادات السرعة."
            },
            {
                problem: "HC-SR04 يعطي قياسات غير صحيحة.",
                solution:
                    "فحص VCC وGND وTRIG وECHO والتأكد من اتجاه الحساس وعدم وجود عائق قريب جدًا أو وضعية غير مناسبة."
            },
            {
                problem: "Arduino يعيد التشغيل عند تشغيل المحركات.",
                solution:
                    "قد يحدث هبوط في الجهد بسبب سحب المحركات للتيار. يجب فحص مصدر الطاقة والتوصيلات والأرضي والتأكد من الفصل المناسب بين قدرة المحركات ومنطق Arduino."
            },
            {
                problem: "الروبوت يكتشف العائق متأخرًا.",
                solution:
                    "زيادة مسافة الكشف في البرنامج ومراجعة سرعة الروبوت ووقت الاستجابة."
            }
        ],

        safety:
            "قبل لمس الأسلاك أو تغيير أي توصيل يجب فصل الطاقة. لا يجب تعديل الدارة بينما المحركات تعمل. يجب احترام قطبية البطارية والجهود المسموح بها لكل مكون. يجب إبقاء الأصابع والأسلاك والملابس بعيدًا عن العجلات والأجزاء المتحركة. إذا ارتفعت حرارة البطارية أو ظهر عليها انتفاخ أو سلوك غير طبيعي، يجب عدم استعمالها. يجب إجراء الاختبارات الأولى في مكان مفتوح وتحت المراقبة.",

        improvements: [
            "إضافة Servo Motor لتحريك الحساس يمينًا ويسارًا.",
            "إضافة حساسات أخرى لتحسين اكتشاف العوائق.",
            "إضافة Bluetooth أو Wi-Fi للتحكم في السيارة عن بعد.",
            "إضافة Encoders لقياس دوران العجلات.",
            "إضافة LEDs لعرض حالة النظام.",
            "إضافة شاشة لعرض المسافة وحالة الروبوت.",
            "تطوير خوارزمية التنقل بدل الاعتماد على قرار بسيط فقط.",
            "إضافة نظام لمراقبة مستوى البطارية.",
            "تحسين الهيكل وتوزيع الوزن للحصول على ثبات أفضل."
        ],

        educational:
            "هذا المشروع يجمع عدة مجالات من الميكاترونيك في نظام واحد. يتعلم الطالب الفرق بين إشارة التحكم والطاقة الكهربائية، ويفهم دور Driver المحركات، ويتعلم طريقة عمل الحساس فوق الصوتي، وكيف يمكن تحويل قيمة مقاسة إلى قرار برمجي. كما يكتشف العلاقة بين الميكانيك والإلكترونيات والبرمجة: المحركات تنتج الحركة، الحساسات تراقب البيئة، Arduino يعالج المعلومات، والبرنامج يحدد سلوك الروبوت.",

        conclusion:
            "السيارة الروبوتية تعتبر مشروعًا ممتازًا للتعرف على أساسيات الروبوتيك والميكاترونيك. فهي تنقل الطالب من مجرد توصيل مكونات إلكترونية إلى بناء نظام قادر على الإحساس بالبيئة واتخاذ قرار وتنفيذ حركة. وبعد نجاح النموذج الأولي يمكن تطويره بإضافة الاتصال اللاسلكي والحساسات والـEncoders وخوارزميات تنقل أكثر تقدمًا."
    }
},

{
    id: 2,

    icon: "🚁",

    fr: {
        title: "Drone Quadcopter",

        description:
            "Étudiez la conception et le fonctionnement d'un drone quadricoptère à quatre moteurs. Ce projet permet de comprendre le rôle du châssis, des moteurs brushless, des ESC, du contrôleur de vol, de la batterie et des hélices, ainsi que les principes utilisés pour maintenir la stabilité et contrôler les mouvements du drone.",

        tags: [
            "Quadcopter",
            "Contrôleur de vol",
            "ESC",
            "Moteurs Brushless",
            "LiPo",
            "Stabilisation"
        ],

        material: [
            "Châssis de quadricoptère",
            "4 moteurs brushless",
            "4 ESC",
            "Contrôleur de vol",
            "Batterie LiPo adaptée",
            "4 hélices adaptées",
            "Câbles et connecteurs",
            "Visserie",
            "Radio-commande et récepteur",
            "Chargeur LiPo adapté"
        ],

        componentsDetails: [

            {
                name: "Châssis",
                explanation:
                    "Le châssis constitue la structure mécanique du drone. Il supporte les quatre moteurs, le contrôleur de vol, la batterie et les autres composants. Il doit être suffisamment rigide et correctement équilibré afin de limiter les vibrations."
            },

            {
                name: "Moteurs Brushless",
                explanation:
                    "Les quatre moteurs brushless fournissent la poussée nécessaire au vol. Chaque moteur entraîne une hélice. La vitesse de rotation des moteurs est contrôlée par les ESC afin de permettre au contrôleur de vol de modifier l'attitude du drone."
            },

            {
                name: "ESC",
                explanation:
                    "L'ESC, ou Electronic Speed Controller, contrôle la puissance envoyée à chaque moteur brushless. Le drone utilise généralement quatre ESC, un pour chaque moteur."
            },

            {
                name: "Contrôleur de vol",
                explanation:
                    "Le contrôleur de vol constitue le cerveau du quadricoptère. Il reçoit les informations des capteurs et les commandes du pilote, puis calcule les corrections nécessaires pour commander les quatre moteurs."
            },

            {
                name: "Batterie LiPo",
                explanation:
                    "La batterie fournit l'énergie électrique nécessaire au système. Une batterie adaptée doit être utilisée conformément aux caractéristiques des moteurs, des ESC et du contrôleur de vol."
            },

            {
                name: "Hélices",
                explanation:
                    "Les hélices transforment la rotation des moteurs en poussée. Un quadricoptère utilise généralement deux hélices tournant dans un sens et deux dans le sens opposé afin de contrôler le couple et la stabilité."
            },

            {
                name: "Radio-commande",
                explanation:
                    "La radio-commande permet au pilote d'envoyer les ordres de déplacement au drone, par exemple augmenter les gaz ou modifier son orientation."
            }
        ],

        principle:
            "Le quadricoptère fonctionne grâce à quatre moteurs qui produisent une poussée verticale. Le contrôleur de vol mesure l'orientation du drone et commande individuellement les moteurs afin de maintenir ou modifier son attitude. Pour monter, la poussée globale est augmentée. Pour effectuer une rotation, le contrôleur modifie la vitesse relative des moteurs tournant dans les deux sens. Pour incliner le drone vers l'avant, l'arrière ou sur le côté, la vitesse de certains moteurs est modifiée de manière contrôlée.",

        mechanicalAssembly:
            "Commencez par assembler le châssis sur une surface stable. Fixez les quatre moteurs aux extrémités des bras en utilisant une fixation adaptée. Placez ensuite le contrôleur de vol près du centre du châssis afin de conserver une bonne répartition des masses. La batterie doit également être positionnée de manière à maintenir le centre de gravité proche du centre du drone.",

        electricalAssembly:
            "Chaque moteur est connecté à son ESC. Les ESC sont ensuite reliés au système d'alimentation et aux sorties correspondantes du contrôleur de vol. Le contrôleur reçoit également l'alimentation appropriée et les signaux de commande. Tous les raccordements doivent être vérifiés avant de connecter la batterie.",

        wiring:
            "Chaque moteur est relié à un ESC. Les ESC sont connectés au système d'alimentation et leurs signaux de commande sont reliés aux sorties moteur du contrôleur de vol. Le récepteur radio est connecté au contrôleur de vol afin de transmettre les commandes du pilote.",

        wiringDetails: [

            "Identifier les quatre moteurs et leur position sur le châssis.",

            "Associer chaque moteur à son ESC correspondant.",

            "Relier les trois fils du moteur brushless à son ESC. L'ordre de deux fils peut être inversé pour modifier le sens de rotation du moteur, après vérification de la documentation du système.",

            "Connecter les ESC au système d'alimentation prévu pour le drone.",

            "Relier les fils de signal des ESC aux sorties moteur correspondantes du contrôleur de vol.",

            "Installer le contrôleur de vol dans la bonne orientation, conformément aux indications présentes sur la carte.",

            "Connecter le récepteur radio au contrôleur de vol selon le protocole utilisé.",

            "Vérifier soigneusement les polarités et les connexions avant toute mise sous tension.",

            "Effectuer les premiers tests sans hélices afin d'éviter tout mouvement dangereux.",

            "Vérifier ensuite le sens de rotation de chaque moteur et corriger la configuration si nécessaire."
        ],

        algorithm:
            "Le contrôleur de vol reçoit les commandes du pilote ainsi que les informations provenant des capteurs. Il compare l'attitude mesurée avec le mouvement demandé. Il calcule ensuite les corrections nécessaires et modifie la puissance des différents moteurs. Cette boucle de contrôle se répète très rapidement afin de maintenir la stabilité du quadricoptère.",

        programming:
            "La programmation d'un drone moderne est principalement réalisée à travers le firmware du contrôleur de vol. La configuration consiste notamment à sélectionner le type de véhicule, calibrer les capteurs, configurer le récepteur, vérifier l'ordre des moteurs, définir les paramètres de contrôle et effectuer les tests nécessaires. Il est important de suivre la documentation du contrôleur et du firmware utilisés.",

        steps: [

            "Étudier le fonctionnement général d'un quadricoptère.",

            "Identifier les composants nécessaires au projet.",

            "Vérifier que le châssis ne présente pas de fissures ou de déformation.",

            "Assembler le châssis.",

            "Identifier les quatre bras et leurs positions.",

            "Installer les quatre moteurs.",

            "Fixer les ESC dans des positions protégées et correctement ventilées.",

            "Installer le contrôleur de vol près du centre du châssis.",

            "Respecter l'orientation indiquée sur le contrôleur de vol.",

            "Installer le récepteur radio.",

            "Réaliser les connexions électriques sans connecter les hélices.",

            "Vérifier toutes les polarités et tous les connecteurs.",

            "Connecter les signaux des ESC aux sorties correspondantes.",

            "Mettre sous tension uniquement lorsque toutes les vérifications sont terminées.",

            "Effectuer la calibration des capteurs selon le firmware utilisé.",

            "Configurer le type de quadricoptère dans le logiciel de configuration.",

            "Configurer et vérifier le récepteur radio.",

            "Tester individuellement les moteurs sans hélices.",

            "Vérifier l'ordre des moteurs.",

            "Vérifier le sens de rotation de chaque moteur.",

            "Installer les hélices uniquement après avoir terminé les tests moteurs.",

            "Vérifier l'orientation et le type de chaque hélice.",

            "Effectuer les contrôles finaux de la structure.",

            "Effectuer un premier essai dans un environnement dégagé et sécurisé.",

            "Analyser le comportement du drone et effectuer les réglages nécessaires."
        ],

        testing:
            "Les tests doivent être réalisés progressivement. Commencez par vérifier le contrôleur de vol, puis le récepteur et enfin les moteurs sans hélices. Après confirmation du bon fonctionnement, les hélices peuvent être installées correctement. Le premier essai doit être effectué dans une zone dégagée, loin des personnes et des obstacles.",

        calibration:
            "La calibration permet au contrôleur de vol de connaître correctement la position et les caractéristiques de ses capteurs. Selon le contrôleur utilisé, il peut être nécessaire de calibrer l'accéléromètre, le gyroscope, le niveau du drone et le système de commande. Le drone doit rester immobile et placé correctement pendant les opérations de calibration.",

        commonProblems: [

            {
                problem: "Un moteur ne tourne pas.",
                solution:
                    "Vérifiez l'alimentation de l'ESC, le câble de signal, les connexions du moteur et la configuration de la sortie moteur dans le contrôleur de vol."
            },

            {
                problem: "Un moteur tourne dans le mauvais sens.",
                solution:
                    "Vérifiez la configuration du moteur et utilisez la méthode prévue par le système pour inverser son sens de rotation."
            },

            {
                problem: "Le drone vibre fortement.",
                solution:
                    "Vérifiez la fixation des moteurs, l'état des hélices, l'équilibrage mécanique et la fixation du contrôleur de vol."
            },

            {
                problem: "Le drone dérive lorsqu'il est posé ou pendant les tests.",
                solution:
                    "Vérifiez la calibration des capteurs, l'orientation du contrôleur de vol et la configuration du système."
            },

            {
                problem: "La radio-commande ne communique pas avec le drone.",
                solution:
                    "Vérifiez l'alimentation du récepteur, son appairage avec la radio-commande et la configuration du protocole utilisé."
            },

            {
                problem: "Le contrôleur de vol ne démarre pas correctement.",
                solution:
                    "Vérifiez son alimentation, les connexions et l'état du firmware en utilisant uniquement les procédures recommandées par le fabricant."
            }
        ],

        safety:
            "La sécurité est essentielle avec un drone. Les hélices peuvent provoquer des blessures et la batterie LiPo doit être manipulée et chargée avec un chargeur compatible. Les premiers tests des moteurs doivent toujours être effectués sans hélices. Avant chaque utilisation, vérifiez l'état du châssis, des hélices, des câbles et de la batterie. Ne faites pas fonctionner le drone près des personnes, des animaux, des routes ou des obstacles. Respectez également les règles locales applicables aux drones.",

        improvements: [

            "Ajouter un système GPS pour les projets compatibles.",

            "Ajouter des capteurs supplémentaires.",

            "Ajouter une télémétrie pour surveiller les paramètres du drone.",

            "Ajouter un système de retour vidéo adapté.",

            "Améliorer la gestion de l'énergie.",

            "Étudier différents algorithmes de stabilisation.",

            "Ajouter une station de suivi des données de vol.",

            "Étudier les effets du poids et de la répartition des masses sur le comportement du drone."
        ],

        educational:
            "Ce projet permet d'étudier plusieurs domaines de la mécatronique : mécanique, électronique, automatique, programmation, capteurs, moteurs électriques et systèmes de contrôle. Il permet également de comprendre concrètement comment plusieurs composants électroniques travaillent ensemble pour réaliser un système autonome et stabilisé.",

        conclusion:
            "Le quadricoptère est un excellent projet pour comprendre les systèmes mécatroniques modernes. Son fonctionnement repose sur l'interaction entre la mécanique du châssis, les moteurs brushless, les ESC, le contrôleur de vol, les capteurs et le système de commande. Une réalisation réussie nécessite une configuration progressive, des tests méthodiques et une attention particulière à la sécurité."
    },


    ar: {
        title: "طائرة رباعية المراوح",

        description:
            "في هذا المشروع سنتعرف بالتفصيل على طريقة تصميم وعمل طائرة رباعية المراوح. سنكتشف دور الهيكل والمحركات بدون فرشاة وESC ووحدة التحكم وبطارية LiPo والمراوح، بالإضافة إلى مبدأ التوازن والتحكم في حركة الطائرة.",

        tags: [
            "Quadcopter",
            "وحدة التحكم بالطيران",
            "ESC",
            "محركات Brushless",
            "LiPo",
            "التوازن"
        ],

        material: [
            "هيكل طائرة رباعية",
            "4 محركات Brushless",
            "4 وحدات ESC",
            "وحدة تحكم بالطيران",
            "بطارية LiPo مناسبة",
            "4 مراوح مناسبة",
            "أسلاك وموصلات",
            "براغي للتثبيت",
            "جهاز تحكم ومستقبل",
            "شاحن LiPo مناسب"
        ],

        componentsDetails: [

            {
                name: "هيكل الطائرة",
                explanation:
                    "الهيكل هو الجزء الميكانيكي الذي يحمل المحركات ووحدة التحكم والبطارية وباقي المكونات. يجب أن يكون صلبًا ومتوازنًا قدر الإمكان حتى يقلل الاهتزازات ويحافظ على توزيع جيد للوزن."
            },

            {
                name: "محركات Brushless",
                explanation:
                    "المحركات الأربعة هي المسؤولة عن إنتاج قوة الدفع اللازمة للطيران. كل محرك يحرك مروحة، ويتم التحكم في سرعة دوران المحركات بواسطة وحدات ESC."
            },

            {
                name: "ESC",
                explanation:
                    "وحدة ESC هي وحدة التحكم الإلكترونية في سرعة المحرك. تقوم بتنظيم الطاقة المرسلة إلى كل محرك Brushless، ولذلك يحتاج النظام عادة إلى أربع وحدات ESC."
            },

            {
                name: "وحدة التحكم بالطيران",
                explanation:
                    "وحدة التحكم بالطيران هي بمثابة عقل الطائرة. تستقبل معلومات الحساسات وأوامر الطيار، ثم تقوم بحساب التعديلات المطلوبة على سرعة المحركات للمحافظة على استقرار الطائرة."
            },

            {
                name: "بطارية LiPo",
                explanation:
                    "البطارية هي مصدر الطاقة لجميع أجزاء النظام. يجب استعمال بطارية متوافقة مع مواصفات المحركات ووحدات ESC ووحدة التحكم، مع الالتزام بتعليمات الشحن والاستعمال."
            },

            {
                name: "المراوح",
                explanation:
                    "المراوح تحول دوران المحركات إلى قوة دفع. في الطائرة الرباعية توجد عادة مراوح تدور في اتجاهين متعاكسين حتى يتم التحكم في عزم الدوران والمحافظة على التوازن."
            },

            {
                name: "جهاز التحكم",
                explanation:
                    "جهاز التحكم يسمح للطيار بإرسال أوامر إلى الطائرة، مثل زيادة أو تقليل الدفع أو تغيير اتجاه الطائرة."
            }
        ],

        principle:
            "تعمل الطائرة الرباعية بواسطة أربعة محركات تنتج قوة دفع إلى الأعلى. تقوم وحدة التحكم بقياس وضعية الطائرة واستقبال أوامر الطيار، ثم تتحكم في سرعة المحركات بشكل منفصل. عند زيادة سرعة المحركات تزداد قوة الدفع. ولتغيير الاتجاه أو الميل، يتم تغيير سرعة بعض المحركات مقارنة بالمحركات الأخرى بطريقة محسوبة.",

        mechanicalAssembly:
            "ابدأ بتركيب هيكل الطائرة على سطح ثابت. قم بتثبيت المحركات الأربعة في نهايات أذرع الهيكل بطريقة مناسبة. بعد ذلك ضع وحدة التحكم بالقرب من مركز الهيكل للمحافظة على توزيع جيد للوزن. يجب أيضًا وضع البطارية بطريقة تجعل مركز الثقل قريبًا من مركز الطائرة.",

        electricalAssembly:
            "يتم توصيل كل محرك بوحدة ESC خاصة به. بعد ذلك يتم ربط وحدات ESC بنظام الطاقة وبمخارج التحكم المناسبة في وحدة التحكم بالطيران. يتم أيضًا توصيل مستقبل جهاز التحكم. يجب فحص جميع التوصيلات والقطبية قبل تشغيل البطارية.",

        wiring:
            "كل محرك يتم ربطه بوحدة ESC، ثم يتم ربط وحدات ESC بنظام الطاقة، بينما يتم توصيل إشارات التحكم الخاصة بها بمخارج المحركات في وحدة التحكم بالطيران. كما يتم توصيل مستقبل جهاز التحكم بوحدة التحكم بالطيران.",

        wiringDetails: [

            "حدد المحركات الأربعة ومواقعها على الهيكل.",

            "خصص وحدة ESC لكل محرك.",

            "قم بتوصيل أسلاك المحرك Brushless الثلاثة بوحدة ESC الخاصة به، مع اتباع طريقة التوصيل الخاصة بالنظام.",

            "قم بتوصيل وحدات ESC بنظام الطاقة المناسب.",

            "صل أسلاك الإشارة الخاصة بوحدات ESC بمخارج المحركات في وحدة التحكم.",

            "ثبت وحدة التحكم بالطيران في الاتجاه الصحيح حسب العلامات الموجودة عليها.",

            "قم بتوصيل مستقبل جهاز التحكم بوحدة التحكم وفق البروتوكول المستخدم.",

            "تحقق من جميع التوصيلات ومن القطبية قبل توصيل البطارية.",

            "قم بأول اختبارات للمحركات بدون تركيب المراوح.",

            "تحقق من اتجاه دوران كل محرك ومن ترتيب المحركات داخل إعدادات وحدة التحكم."
        ],

        algorithm:
            "تستقبل وحدة التحكم أوامر الطيار ومعلومات الحساسات. تقوم بمقارنة الوضعية الحالية للطائرة بالحركة المطلوبة، ثم تحسب التصحيحات اللازمة وتعدل سرعة المحركات الأربعة. تتكرر هذه العملية بسرعة كبيرة للمحافظة على استقرار الطائرة أثناء الطيران.",

        programming:
            "تتم برمجة الطائرة عادة من خلال البرنامج الثابت الموجود في وحدة التحكم بالطيران. تشمل عملية الإعداد اختيار نوع الطائرة، معايرة الحساسات، إعداد جهاز التحكم، التأكد من ترتيب المحركات واتجاه دورانها وضبط إعدادات التحكم. يجب دائمًا اتباع وثائق وحدة التحكم والبرنامج الثابت المستخدم.",

        steps: [

            "التعرف على مبدأ عمل الطائرة الرباعية.",

            "تحديد جميع المكونات اللازمة للمشروع.",

            "فحص الهيكل والتأكد من عدم وجود تشققات أو تلف.",

            "تركيب هيكل الطائرة.",

            "تحديد الأذرع الأربعة ومواقعها.",

            "تثبيت المحركات الأربعة.",

            "تثبيت وحدات ESC في أماكن مناسبة ومحميّة.",

            "تركيب وحدة التحكم بالقرب من مركز الهيكل.",

            "التأكد من اتجاه وحدة التحكم.",

            "تركيب مستقبل جهاز التحكم.",

            "إنجاز التوصيلات الكهربائية مع عدم تركيب المراوح.",

            "فحص جميع التوصيلات والقطبية.",

            "ربط إشارات ESC بالمخارج المناسبة.",

            "تشغيل النظام فقط بعد التأكد من التوصيلات.",

            "معايرة الحساسات حسب البرنامج المستخدم.",

            "اختيار نوع الطائرة الرباعية في برنامج الإعداد.",

            "إعداد جهاز التحكم والتأكد من وصول الأوامر.",

            "اختبار كل محرك بشكل منفصل بدون مراوح.",

            "التأكد من ترتيب المحركات.",

            "التأكد من اتجاه دوران كل محرك.",

            "تركيب المراوح بعد الانتهاء من اختبارات المحركات.",

            "التأكد من اتجاه وتركيب كل مروحة.",

            "فحص الهيكل والتوصيلات للمرة الأخيرة.",

            "إجراء اختبار أولي في مكان مفتوح وآمن.",

            "تحليل أداء الطائرة وإجراء الإعدادات اللازمة."
        ],

        testing:
            "يجب إجراء الاختبارات تدريجيًا. ابدأ بفحص وحدة التحكم، ثم جهاز الاستقبال، ثم اختبر المحركات بدون مراوح. بعد التأكد من عمل النظام بشكل صحيح يمكن تركيب المراوح. يجب أن يتم الاختبار الأول في مكان مفتوح وبعيد عن الأشخاص والعوائق.",

        calibration:
            "المعايرة تساعد وحدة التحكم على فهم وضعية وحالة الحساسات بشكل صحيح. حسب نوع وحدة التحكم يمكن أن تشمل المعايرة الجيروسكوب ومقياس التسارع ومستوى الطائرة ونظام التحكم. أثناء المعايرة يجب وضع الطائرة على سطح ثابت وعدم تحريكها.",

        commonProblems: [

            {
                problem: "أحد المحركات لا يدور.",
                solution:
                    "تحقق من طاقة ESC، وسلك الإشارة، وتوصيلات المحرك، وإعداد مخرج المحرك في وحدة التحكم."
            },

            {
                problem: "أحد المحركات يدور في الاتجاه الخاطئ.",
                solution:
                    "تحقق من إعدادات المحرك واتبع الطريقة المخصصة في النظام لتغيير اتجاه الدوران."
            },

            {
                problem: "الطائرة تهتز بشكل كبير.",
                solution:
                    "تحقق من تثبيت المحركات وحالة المراوح وتوازن الهيكل وطريقة تثبيت وحدة التحكم."
            },

            {
                problem: "الطائرة تنحرف عن وضعها.",
                solution:
                    "تحقق من معايرة الحساسات واتجاه وحدة التحكم وإعدادات النظام."
            },

            {
                problem: "جهاز التحكم لا يتصل بالطائرة.",
                solution:
                    "تحقق من طاقة المستقبل ومن عملية الربط بين جهاز التحكم والمستقبل ومن إعداد البروتوكول المستخدم."
            },

            {
                problem: "وحدة التحكم لا تعمل بشكل صحيح.",
                solution:
                    "تحقق من مصدر الطاقة والتوصيلات وحالة البرنامج الثابت، واتبع تعليمات الشركة المصنعة."
            }
        ],

        safety:
            "السلامة مهمة جدًا عند التعامل مع الطائرات بدون طيار. يمكن للمراوح أن تسبب إصابات، كما يجب التعامل مع بطاريات LiPo وشحنها باستعمال شاحن متوافق. يجب إجراء الاختبارات الأولى للمحركات بدون مراوح. قبل كل تشغيل، افحص الهيكل والمراوح والأسلاك والبطارية. لا تشغل الطائرة بالقرب من الأشخاص أو الحيوانات أو الطرق أو العوائق، واحترم القوانين المحلية المتعلقة بالطائرات بدون طيار.",

        improvements: [

            "إضافة نظام GPS في المشاريع المتوافقة.",

            "إضافة حساسات إضافية.",

            "إضافة نظام Telemetry لمراقبة بيانات الطائرة.",

            "إضافة نظام نقل فيديو مناسب.",

            "تحسين إدارة استهلاك الطاقة.",

            "دراسة خوارزميات مختلفة لتحقيق الاستقرار.",

            "إنشاء محطة لمراقبة بيانات الرحلة.",

            "دراسة تأثير وزن المكونات وتوزيعها على أداء الطائرة."
        ],

        educational:
            "يسمح هذا المشروع بدراسة عدة مجالات من الميكاترونيك مثل الميكانيك والإلكترونيات والأتمتة والبرمجة والحساسات والمحركات الكهربائية وأنظمة التحكم. كما يساعد على فهم كيفية تعاون عدة مكونات إلكترونية وميكانيكية لإنشاء نظام مستقر ومتحكم فيه.",

        conclusion:
            "تعتبر الطائرة الرباعية مشروعًا ممتازًا لفهم الأنظمة الميكاترونية الحديثة. فهي تجمع بين الهيكل الميكانيكي والمحركات ووحدات ESC ووحدة التحكم والحساسات ونظام التحكم. ويتطلب إنجازها بطريقة صحيحة العمل بشكل تدريجي وإجراء الاختبارات بعناية والاهتمام بالسلامة."
    }
},

{
    id: 3,

    icon: "🦾",

    fr: {
        title: "Bras Robotique",

        description:
            "Construisez et étudiez un bras robotique capable d'effectuer plusieurs mouvements contrôlés grâce à des servomoteurs. Ce projet permet de comprendre la mécanique d'un bras articulé, le contrôle des angles, la commande des servomoteurs et la synchronisation de plusieurs axes.",

        tags: [
            "Arduino",
            "Servomoteurs",
            "PWM",
            "Robotique",
            "Cinématique",
            "Structure mécanique"
        ],

        material: [
            "Arduino Uno",
            "3 à 5 servomoteurs selon le modèle du bras",
            "Structure mécanique du bras",
            "Base rotative",
            "Bras et articulations",
            "Pince robotique",
            "Potentiomètres",
            "Alimentation adaptée aux servomoteurs",
            "Fils Dupont",
            "Plaque d'essai ou connecteurs",
            "Vis et éléments de fixation"
        ],

        componentsDetails: [

            {
                name: "Arduino Uno",
                explanation:
                    "L'Arduino Uno constitue l'unité de commande du bras. Il reçoit les informations provenant des potentiomètres ou d'autres commandes et génère les signaux nécessaires pour contrôler les servomoteurs."
            },

            {
                name: "Servomoteurs",
                explanation:
                    "Les servomoteurs permettent de contrôler précisément la position des différents axes du bras. Chaque servo peut être utilisé pour une articulation particulière : rotation de la base, mouvement du bras, avant-bras ou ouverture de la pince."
            },

            {
                name: "Structure mécanique",
                explanation:
                    "La structure constitue le squelette du bras robotique. Elle relie les différents servomoteurs et permet de transmettre leurs mouvements aux articulations."
            },

            {
                name: "Potentiomètres",
                explanation:
                    "Les potentiomètres peuvent être utilisés comme commandes manuelles. Leur position est lue par les entrées analogiques de l'Arduino puis transformée en angles de commande pour les servomoteurs."
            },

            {
                name: "Pince robotique",
                explanation:
                    "La pince constitue l'extrémité du bras. Elle permet de saisir ou de déplacer de petits objets adaptés aux capacités mécaniques du système."
            },

            {
                name: "Alimentation",
                explanation:
                    "Les servomoteurs peuvent demander davantage de courant que l'Arduino ne peut fournir directement. Une alimentation adaptée aux servomoteurs est donc nécessaire, avec une masse commune correctement réalisée avec le système de commande."
            }
        ],

        principle:
            "Le bras robotique est constitué de plusieurs articulations. Chaque articulation est commandée par un servomoteur qui reçoit une consigne de position. L'Arduino transforme les commandes de l'utilisateur en positions pour les différents servomoteurs. En combinant plusieurs axes, le bras peut atteindre différentes positions et réaliser des mouvements coordonnés.",

        mechanicalAssembly:
            "Commencez par assembler la base du bras. Fixez ensuite le premier servomoteur qui contrôlera généralement la rotation de la base. Ajoutez progressivement les différentes parties mécaniques : bras inférieur, articulation centrale, avant-bras et pince. Chaque pièce doit être correctement fixée afin de limiter les jeux mécaniques et les vibrations.",

        electricalAssembly:
            "Chaque servomoteur possède généralement trois connexions : alimentation, masse et signal. Les fils de signal sont reliés aux broches de commande de l'Arduino. Les servomoteurs doivent recevoir une alimentation adaptée à leurs caractéristiques. Il est important que la masse de l'alimentation et celle de l'Arduino soient correctement communes lorsque cela est requis par le montage.",

        wiring:
            "Les fils de signal des servomoteurs sont connectés aux broches numériques utilisées pour leur commande. Les potentiomètres sont connectés aux entrées analogiques de l'Arduino. L'alimentation des servomoteurs doit être adaptée à leur consommation et ne doit pas être remplacée par une source inappropriée.",

        wiringDetails: [

            "Identifier chaque servomoteur et déterminer l'axe mécanique qu'il contrôle.",

            "Connecter le signal du premier servomoteur à une broche de commande de l'Arduino.",

            "Connecter les autres servomoteurs à leurs broches de commande respectives.",

            "Connecter les potentiomètres aux entrées analogiques utilisées par le programme.",

            "Connecter correctement l'alimentation des servomoteurs selon leurs caractéristiques.",

            "Relier les masses conformément au schéma du montage.",

            "Éviter de faire passer la totalité du courant des servomoteurs directement par l'Arduino.",

            "Vérifier chaque connexion avant de mettre le système sous tension.",

            "Tester les servomoteurs progressivement afin d'identifier chaque axe.",

            "Vérifier que le mouvement mécanique correspond à l'angle demandé par le programme."
        ],

        algorithm:
            "Le programme commence par lire la position des potentiomètres. Chaque valeur analogique est ensuite convertie en une plage d'angles correspondant au servomoteur associé. L'Arduino envoie alors les nouvelles positions aux servomoteurs. Cette opération est répétée continuellement afin que les mouvements du bras suivent les commandes de l'utilisateur.",

        programming:
            "La programmation peut être réalisée avec la bibliothèque Servo de l'environnement Arduino. Chaque servomoteur est associé à une broche de commande et à une variable représentant sa position. Les valeurs provenant des potentiomètres sont lues avec les entrées analogiques puis converties en angles adaptés aux servomoteurs. Des limites peuvent être ajoutées afin d'éviter que les articulations dépassent leur plage mécanique autorisée.",

        steps: [

            "Étudier la structure générale d'un bras robotique.",

            "Identifier les différents axes et articulations.",

            "Identifier le rôle de chaque servomoteur.",

            "Préparer toutes les pièces mécaniques.",

            "Assembler la base du bras.",

            "Installer le premier servomoteur.",

            "Fixer le premier bras sur son axe.",

            "Installer le servomoteur de l'articulation suivante.",

            "Ajouter progressivement les différentes parties mécaniques.",

            "Installer la pince robotique.",

            "Vérifier que chaque articulation peut effectuer son mouvement sans blocage.",

            "Identifier les broches de commande utilisées par les servomoteurs.",

            "Connecter les servomoteurs.",

            "Connecter les potentiomètres aux entrées analogiques.",

            "Préparer une alimentation adaptée aux servomoteurs.",

            "Vérifier toutes les connexions.",

            "Charger le programme Arduino.",

            "Tester un servomoteur à la fois.",

            "Déterminer les limites mécaniques de chaque axe.",

            "Ajouter des limites de sécurité dans le programme.",

            "Tester chaque potentiomètre individuellement.",

            "Associer chaque potentiomètre à son axe.",

            "Tester deux axes simultanément.",

            "Synchroniser progressivement plusieurs axes.",

            "Tester finalement l'ensemble du bras avec des mouvements lents et contrôlés."
        ],

        testing:
            "Les tests doivent commencer avec un seul servomoteur afin de vérifier son fonctionnement et son sens de mouvement. Chaque axe doit ensuite être testé séparément. Après validation de tous les axes, plusieurs servomoteurs peuvent être commandés simultanément. Les premiers essais avec la pince doivent être réalisés avec de petits objets légers et sans forcer les articulations.",

        calibration:
            "La calibration consiste à déterminer une position initiale correcte pour chaque servomoteur et à définir les limites de mouvement de chaque articulation. Les potentiomètres doivent également être associés correctement à la plage d'angles des servomoteurs. Il est préférable de commencer avec des mouvements limités puis d'augmenter progressivement la plage après vérification.",

        commonProblems: [

            {
                problem: "Un servomoteur ne bouge pas.",
                solution:
                    "Vérifiez le signal, l'alimentation, la masse et la broche utilisée dans le programme. Vérifiez également que le servo fonctionne correctement."
            },

            {
                problem: "Le servomoteur tremble.",
                solution:
                    "Vérifiez la qualité de l'alimentation, les connexions et la stabilité mécanique. Un servomoteur peut également réagir aux variations rapides de la consigne."
            },

            {
                problem: "L'Arduino redémarre lorsque plusieurs servomoteurs bougent.",
                solution:
                    "Les servomoteurs peuvent demander un courant important. Vérifiez que leur alimentation est suffisamment adaptée et évitez de les alimenter directement depuis une sortie incapable de fournir le courant nécessaire."
            },

            {
                problem: "Le bras atteint une position incorrecte.",
                solution:
                    "Vérifiez la calibration, la correspondance entre le potentiomètre et le servo ainsi que les limites d'angle définies dans le programme."
            },

            {
                problem: "Une articulation se bloque.",
                solution:
                    "Coupez le système et vérifiez la structure mécanique. Recherchez un mauvais alignement, une pièce qui frotte ou une limite mécanique dépassée."
            },

            {
                problem: "La pince ne s'ouvre pas correctement.",
                solution:
                    "Vérifiez la position initiale du servo, la fixation mécanique de la pince et la plage d'angles utilisée dans le programme."
            }
        ],

        safety:
            "Travaillez toujours avec des mouvements lents lors des premiers essais. Ne placez pas les doigts entre les articulations lorsque le système est alimenté. Évitez de forcer les servomoteurs contre des obstacles mécaniques. Utilisez une alimentation adaptée aux caractéristiques des servomoteurs et coupez l'alimentation avant toute modification du câblage.",

        improvements: [

            "Ajouter une commande par joystick.",

            "Ajouter un écran pour afficher les angles des articulations.",

            "Ajouter des capteurs de position.",

            "Créer une commande sans fil.",

            "Programmer des positions prédéfinies.",

            "Ajouter une fonction d'enregistrement et de reproduction des mouvements.",

            "Créer une pince plus précise.",

            "Ajouter plusieurs modes de fonctionnement.",

            "Étudier la cinématique inverse pour commander l'extrémité du bras directement."
        ],

        educational:
            "Ce projet permet d'étudier la mécanique des articulations, les servomoteurs, les signaux de commande, les entrées analogiques, la programmation Arduino et les principes de la robotique. Il constitue également une introduction à la cinématique, car la position finale de la pince dépend de la combinaison des mouvements de plusieurs articulations.",

        conclusion:
            "Le bras robotique constitue un excellent projet de mécatronique permettant de combiner mécanique, électronique et programmation. En contrôlant plusieurs servomoteurs avec Arduino, il devient possible de créer un système capable d'effectuer des mouvements coordonnés et de manipuler de petits objets."
    },


    ar: {
        title: "الذراع الروبوتية",

        description:
            "في هذا المشروع سنقوم بدراسة وإنجاز ذراع روبوتية قادرة على تنفيذ عدة حركات باستعمال محركات Servo. يسمح المشروع بفهم ميكانيكية الذراع المفصلية، والتحكم في الزوايا، وطريقة تشغيل المحركات المؤازرة، بالإضافة إلى تنسيق حركة عدة محاور.",

        tags: [
            "Arduino",
            "Servomoteurs",
            "PWM",
            "روبوتيك",
            "الحركية",
            "هيكل ميكانيكي"
        ],

        material: [
            "Arduino Uno",
            "من 3 إلى 5 محركات Servo حسب نموذج الذراع",
            "هيكل ميكانيكي للذراع",
            "قاعدة دوارة",
            "أذرع ومفاصل ميكانيكية",
            "ملقط روبوتي",
            "Potentiomètres",
            "مصدر طاقة مناسب للمحركات",
            "أسلاك Dupont",
            "لوحة تجارب أو موصلات",
            "براغي وقطع تثبيت"
        ],

        componentsDetails: [

            {
                name: "Arduino Uno",
                explanation:
                    "تعتبر Arduino Uno وحدة التحكم الرئيسية في الذراع. تستقبل المعلومات من Potentiomètres أو وسائل التحكم الأخرى، ثم ترسل إشارات التحكم المناسبة إلى محركات Servo."
            },

            {
                name: "محركات Servo",
                explanation:
                    "تسمح محركات Servo بالتحكم الدقيق في وضعية المحاور المختلفة للذراع. يمكن تخصيص محرك لكل مفصل مثل دوران القاعدة أو حركة الذراع أو الساعد أو فتح وإغلاق الملقط."
            },

            {
                name: "الهيكل الميكانيكي",
                explanation:
                    "يمثل الهيكل العظام الميكانيكية للذراع، حيث يربط بين المحركات والمفاصل ويسمح بتحويل حركة المحركات إلى حركة ميكانيكية."
            },

            {
                name: "Potentiomètres",
                explanation:
                    "يمكن استعمال Potentiomètres كوسيلة تحكم يدوية. تتم قراءة قيمتها بواسطة المداخل التناظرية في Arduino ثم تحويلها إلى زوايا مناسبة لمحركات Servo."
            },

            {
                name: "الملقط الروبوتي",
                explanation:
                    "يمثل الملقط نهاية الذراع، ويمكنه الإمساك بأجسام صغيرة وخفيفة وتحريكها ضمن حدود قدرة الذراع."
            },

            {
                name: "مصدر الطاقة",
                explanation:
                    "تحتاج محركات Servo إلى تيار يمكن أن يكون أكبر مما تستطيع Arduino توفيره مباشرة. لذلك يجب استعمال مصدر طاقة مناسب للمحركات مع التأكد من وجود توصيل صحيح للـGND مع نظام التحكم عند الحاجة."
            }
        ],

        principle:
            "تتكون الذراع الروبوتية من عدة مفاصل، وكل مفصل يتم التحكم فيه بواسطة محرك Servo يستقبل زاوية محددة. تقوم Arduino بتحويل أوامر المستخدم إلى زوايا للمحركات. ومن خلال الجمع بين عدة محاور يمكن للذراع الوصول إلى أوضاع مختلفة وتنفيذ حركات منسقة.",

        mechanicalAssembly:
            "ابدأ بتركيب قاعدة الذراع. ثم ثبت أول محرك Servo الذي يتحكم عادة في دوران القاعدة. بعد ذلك أضف الأجزاء الميكانيكية تدريجيًا مثل الذراع السفلي والمفصل الأوسط والساعد والملقط. يجب تثبيت جميع القطع جيدًا لتقليل الاهتزاز والحركة غير المرغوبة.",

        electricalAssembly:
            "عادة يحتوي محرك Servo على ثلاثة أسلاك: الطاقة والأرضي والإشارة. يتم ربط أسلاك الإشارة بمخارج التحكم في Arduino. يجب أن تحصل المحركات على مصدر طاقة مناسب لمواصفاتها، كما يجب ربط الأرضي بطريقة صحيحة بين مصدر الطاقة وArduino عند الحاجة.",

        wiring:
            "يتم ربط أسلاك الإشارة الخاصة بمحركات Servo بالمخارج الرقمية المستخدمة للتحكم. أما Potentiomètres فتربط بالمداخل التناظرية في Arduino. ويجب أن يكون مصدر الطاقة الخاص بالمحركات مناسبًا لاستهلاكها، وعدم استعمال مصدر غير مناسب.",

        wiringDetails: [

            "حدد كل محرك Servo والمفصل الذي يتحكم فيه.",

            "صل إشارة المحرك الأول بالمنفذ المخصص له في Arduino.",

            "صل باقي محركات Servo بالمخارج المخصصة لها.",

            "صل Potentiomètres بالمداخل التناظرية المستخدمة في البرنامج.",

            "قم بتوصيل مصدر الطاقة المناسب لمحركات Servo.",

            "تأكد من توصيل GND بطريقة صحيحة حسب الدارة.",

            "لا تمرر تيار المحركات بالكامل عبر Arduino إذا كان المصدر غير قادر على ذلك.",

            "تحقق من جميع التوصيلات قبل تشغيل النظام.",

            "اختبر المحركات تدريجيًا لمعرفة المحور الذي يتحكم فيه كل محرك.",

            "تأكد من أن الحركة الميكانيكية تتوافق مع الزاوية التي يرسلها البرنامج."
        ],

        algorithm:
            "يبدأ البرنامج بقراءة قيم Potentiomètres. بعد ذلك يتم تحويل كل قيمة تناظرية إلى مجال من الزوايا الخاصة بمحرك Servo معين. ترسل Arduino الزوايا الجديدة إلى المحركات، وتتكرر العملية باستمرار حتى تتبع حركة الذراع أوامر المستخدم.",

        programming:
            "يمكن برمجة الذراع باستعمال مكتبة Servo الموجودة في بيئة Arduino. يتم ربط كل محرك Servo بمنفذ معين ومتغير يمثل موضعه. تتم قراءة Potentiomètres بواسطة المداخل التناظرية ثم تحويل القيم إلى زوايا مناسبة للمحركات. ويمكن إضافة حدود للزوايا لمنع المفاصل من تجاوز مجال الحركة الميكانيكي.",

        steps: [

            "دراسة البنية العامة للذراع الروبوتية.",

            "تحديد المحاور والمفاصل المختلفة.",

            "تحديد وظيفة كل محرك Servo.",

            "تحضير جميع القطع الميكانيكية.",

            "تركيب قاعدة الذراع.",

            "تثبيت أول محرك Servo.",

            "تثبيت الذراع الأولى على المحور.",

            "تركيب محرك المفصل التالي.",

            "إضافة الأجزاء الميكانيكية تدريجيًا.",

            "تركيب الملقط الروبوتي.",

            "التأكد من أن كل مفصل يتحرك بدون عوائق.",

            "تحديد منافذ التحكم المستخدمة للمحركات.",

            "توصيل محركات Servo.",

            "توصيل Potentiomètres بالمداخل التناظرية.",

            "تجهيز مصدر طاقة مناسب للمحركات.",

            "فحص جميع التوصيلات.",

            "تحميل برنامج Arduino.",

            "اختبار محرك واحد في كل مرة.",

            "تحديد الحدود الميكانيكية لكل محور.",

            "إضافة حدود آمنة للزوايا داخل البرنامج.",

            "اختبار كل Potentiomètre بشكل منفصل.",

            "ربط كل Potentiomètre بالمحور المناسب.",

            "اختبار محورين في نفس الوقت.",

            "تنسيق حركة عدة محاور تدريجيًا.",

            "اختبار الذراع بالكامل بحركات بطيئة ومتحكم فيها."
        ],

        testing:
            "يجب أن تبدأ الاختبارات بمحرك Servo واحد للتأكد من عمله واتجاه حركته. بعد ذلك يتم اختبار كل محور بشكل منفصل. وبعد نجاح الاختبارات يمكن تشغيل عدة محاور في نفس الوقت. يجب أن تكون الاختبارات الأولى للملقط باستعمال أجسام صغيرة وخفيفة دون إجبار المفاصل.",

        calibration:
            "المعايرة تعني تحديد الوضعية الأولية الصحيحة لكل محرك Servo وتحديد حدود الحركة لكل مفصل. كما يجب ربط مجال Potentiomètre بمجال الزوايا المناسب للمحرك. من الأفضل البدء بحركات محدودة ثم زيادة المجال تدريجيًا بعد التأكد من سلامة الحركة.",

        commonProblems: [

            {
                problem: "أحد محركات Servo لا يتحرك.",
                solution:
                    "تحقق من سلك الإشارة والطاقة وGND والمنفذ المستعمل في البرنامج، وتأكد أيضًا من أن المحرك يعمل بشكل صحيح."
            },

            {
                problem: "محرك Servo يهتز.",
                solution:
                    "تحقق من جودة مصدر الطاقة والتوصيلات وثبات الهيكل. كما يمكن أن تحدث الاهتزازات بسبب تغير أوامر الحركة بسرعة كبيرة."
            },

            {
                problem: "Arduino تعيد التشغيل عند تحرك عدة محركات.",
                solution:
                    "قد تحتاج المحركات إلى تيار أكبر عند الحركة. تحقق من أن مصدر الطاقة مناسب للمحركات وتجنب تشغيلها من مصدر غير قادر على توفير التيار المطلوب."
            },

            {
                problem: "الذراع تصل إلى وضعية غير صحيحة.",
                solution:
                    "تحقق من المعايرة ومن العلاقة بين Potentiomètre والمحرك ومن حدود الزوايا الموجودة في البرنامج."
            },

            {
                problem: "أحد المفاصل يتوقف أو يعلق.",
                solution:
                    "أوقف النظام وافحص التركيب الميكانيكي. ابحث عن سوء محاذاة أو احتكاك أو تجاوز للحد الميكانيكي."
            },

            {
                problem: "الملقط لا يفتح بشكل صحيح.",
                solution:
                    "تحقق من الوضعية الأولية للمحرك ومن تثبيت الملقط ومن مجال الزوايا المستخدم في البرنامج."
            }
        ],

        safety:
            "يجب العمل بحركات بطيئة أثناء الاختبارات الأولى. لا تضع أصابعك بين المفاصل عندما يكون النظام يعمل. لا تجبر محركات Servo على الحركة ضد عائق ميكانيكي. استعمل مصدر طاقة مناسبًا للمحركات وافصل الطاقة قبل تغيير أي توصيل كهربائي.",

        improvements: [

            "إضافة Joystick للتحكم في الذراع.",

            "إضافة شاشة لعرض زوايا المفاصل.",

            "إضافة حساسات موضع.",

            "إضافة تحكم لاسلكي.",

            "برمجة أوضاع وحركات جاهزة.",

            "إضافة تسجيل للحركات وإعادة تشغيلها.",

            "تصميم ملقط أكثر دقة.",

            "إضافة عدة أوضاع تشغيل.",

            "دراسة الحركية العكسية للتحكم مباشرة في موقع نهاية الذراع."
        ],

        educational:
            "يسمح هذا المشروع بدراسة ميكانيكية المفاصل ومحركات Servo وإشارات التحكم والمداخل التناظرية وبرمجة Arduino ومبادئ الروبوتيك. كما يمثل مقدمة إلى علم الحركية، لأن الموضع النهائي للملقط يعتمد على الجمع بين حركات عدة مفاصل.",

        conclusion:
            "الذراع الروبوتية مشروع ممتاز في الميكاترونيك لأنه يجمع بين الميكانيك والإلكترونيات والبرمجة. ومن خلال التحكم في عدة محركات Servo باستعمال Arduino يمكن إنشاء نظام قادر على تنفيذ حركات منسقة والتعامل مع أجسام صغيرة."
    }
},

   {
    id: 4,

    icon: "🚗🔵",

    fr: {
        title: "Robot Suiveur de Ligne",

        description:
            "Construisez un robot mobile capable de détecter une ligne au sol et d'ajuster automatiquement sa trajectoire. Le robot utilise des capteurs infrarouges pour distinguer la ligne de la surface et commande deux moteurs DC afin de rester sur le parcours.",

        tags: [
            "Arduino",
            "Capteurs IR",
            "Moteurs DC",
            "L298N",
            "Robotique autonome",
            "Suivi de ligne"
        ],

        material: [
            "Arduino Uno",
            "2 moteurs DC",
            "Driver moteur L298N",
            "2 ou 3 capteurs infrarouges",
            "Châssis robotique",
            "2 roues motrices",
            "Roue libre ou roulette",
            "Batterie adaptée",
            "Fils Dupont",
            "Interrupteur",
            "Vis et supports de fixation"
        ],

        componentsDetails: [

            {
                name: "Arduino Uno",
                explanation:
                    "L'Arduino Uno reçoit les informations des capteurs infrarouges et décide de la direction du robot. Il commande ensuite le driver moteur afin de modifier la vitesse et le sens de rotation des moteurs."
            },

            {
                name: "Capteurs infrarouges",
                explanation:
                    "Les capteurs IR permettent de détecter la différence entre la ligne et la surface. Ils émettent et reçoivent un rayonnement infrarouge, puis fournissent une information à l'Arduino."
            },

            {
                name: "Moteurs DC",
                explanation:
                    "Les deux moteurs DC entraînent les roues du robot. En faisant varier leur fonctionnement, le robot peut avancer, ralentir, tourner à gauche ou tourner à droite."
            },

            {
                name: "Driver L298N",
                explanation:
                    "Le L298N permet à l'Arduino de commander les moteurs DC. Il sert d'interface de puissance entre la carte de commande et les moteurs."
            },

            {
                name: "Châssis",
                explanation:
                    "Le châssis supporte les composants et assure la structure mécanique du robot. Une bonne fixation des moteurs et des capteurs permet d'obtenir un déplacement plus stable."
            },

            {
                name: "Roue libre",
                explanation:
                    "La roue libre ou roulette permet de supporter une partie du poids du robot tout en laissant les deux roues motrices contrôler la direction."
            }
        ],

        principle:
            "Le robot utilise les informations des capteurs infrarouges pour déterminer la position de la ligne par rapport à lui. Lorsque la ligne est correctement détectée, les deux moteurs avancent. Si le robot se déplace vers un côté de la ligne, la vitesse des moteurs est modifiée afin de corriger sa trajectoire. Cette correction se répète continuellement.",

        mechanicalAssembly:
            "Commencez par préparer le châssis et fixez les deux moteurs DC de manière symétrique. Installez les roues motrices puis ajoutez la roue libre. Les capteurs infrarouges doivent être placés à l'avant du robot et à une hauteur adaptée à leur fonctionnement. Leur position doit rester suffisamment proche du sol tout en évitant les contacts avec la piste.",

        electricalAssembly:
            "Les moteurs sont connectés au driver L298N. Le driver reçoit les signaux de commande provenant de l'Arduino et fournit la puissance nécessaire aux moteurs. Les capteurs infrarouges sont connectés aux entrées de l'Arduino. L'alimentation doit être adaptée aux composants utilisés et les masses doivent être correctement reliées.",

        wiring:
            "Les sorties des capteurs infrarouges sont connectées aux entrées de l'Arduino. Les entrées de commande du L298N sont reliées aux sorties numériques de l'Arduino. Les moteurs sont connectés aux sorties du driver et l'alimentation est reliée conformément aux caractéristiques du système.",

        wiringDetails: [

            "Installer les capteurs infrarouges à l'avant du châssis.",

            "Connecter l'alimentation et la masse de chaque capteur.",

            "Connecter les sorties des capteurs aux entrées de l'Arduino.",

            "Connecter le moteur gauche aux sorties correspondantes du L298N.",

            "Connecter le moteur droit aux autres sorties du L298N.",

            "Relier les entrées de commande du L298N aux broches numériques de l'Arduino.",

            "Connecter l'alimentation du système selon les caractéristiques du moteur et du driver.",

            "Relier correctement les masses de l'Arduino, du driver et des capteurs lorsque le montage l'exige.",

            "Vérifier toutes les connexions avant la mise sous tension.",

            "Tester chaque capteur séparément avant de lancer le programme complet."
        ],

        algorithm:
            "Le programme lit en permanence l'état des capteurs infrarouges. Si la ligne se trouve au centre, les deux moteurs avancent. Si le capteur gauche détecte la ligne, le programme corrige la trajectoire vers la gauche. Si le capteur droit détecte la ligne, le robot corrige vers la droite. Avec trois capteurs, il est possible d'obtenir davantage d'informations sur la position de la ligne.",

        programming:
            "Le programme Arduino commence par définir les broches des capteurs et les broches de commande du L298N. Dans la boucle principale, l'état des capteurs est lu puis comparé à différentes situations. Le programme choisit ensuite une action : avancer, ralentir un moteur, tourner ou arrêter le robot. Une commande PWM peut également être utilisée pour ajuster la vitesse des moteurs.",

        steps: [

            "Étudier le principe général du suivi de ligne.",

            "Identifier les composants nécessaires.",

            "Préparer le châssis.",

            "Fixer les deux moteurs DC.",

            "Installer les roues motrices.",

            "Installer la roue libre.",

            "Placer les capteurs infrarouges à l'avant.",

            "Régler la hauteur des capteurs par rapport au sol.",

            "Connecter les capteurs à l'Arduino.",

            "Installer le driver L298N.",

            "Connecter les moteurs au driver.",

            "Relier le driver aux sorties de commande de l'Arduino.",

            "Vérifier les connexions électriques.",

            "Mettre le robot sous tension.",

            "Tester chaque capteur individuellement.",

            "Vérifier les niveaux logiques retournés par les capteurs.",

            "Tester le moteur gauche.",

            "Tester le moteur droit.",

            "Vérifier le sens de rotation des deux moteurs.",

            "Charger le programme de suivi de ligne.",

            "Placer le robot sur une piste simple.",

            "Observer la réaction des capteurs.",

            "Ajuster la position et la hauteur des capteurs.",

            "Ajuster progressivement la vitesse des moteurs.",

            "Tester le robot sur des courbes et des changements de direction."
        ],

        testing:
            "Commencez par tester les capteurs sans faire avancer le robot. Placez ensuite le robot sur une portion droite de la piste et vérifiez sa réaction. Après cela, testez des virages simples puis des courbes plus difficiles. Les réglages doivent être effectués progressivement afin d'éviter que le robot perde rapidement la ligne.",

        calibration:
            "La calibration consiste principalement à déterminer la réponse des capteurs selon la surface utilisée. La hauteur des capteurs, leur orientation et leur position par rapport à l'axe du robot influencent fortement le résultat. Il faut également régler la vitesse des moteurs afin que le robot puisse corriger sa trajectoire sans effectuer des mouvements trop brusques.",

        commonProblems: [

            {
                problem: "Le robot ne détecte pas la ligne.",
                solution:
                    "Vérifiez l'alimentation des capteurs, leurs connexions, leur hauteur par rapport au sol et leur réglage de sensibilité si le module en possède un."
            },

            {
                problem: "Le robot tourne constamment d'un côté.",
                solution:
                    "Vérifiez la position des capteurs, le sens de rotation des moteurs et les conditions utilisées dans le programme."
            },

            {
                problem: "Le robot avance mais ne corrige pas sa trajectoire.",
                solution:
                    "Vérifiez que les sorties des capteurs arrivent correctement sur l'Arduino et que les conditions de correction sont correctement programmées."
            },

            {
                problem: "Le robot perd la ligne dans les virages.",
                solution:
                    "Réduisez progressivement la vitesse et améliorez la position des capteurs. Vous pouvez également utiliser plusieurs capteurs pour obtenir davantage d'informations."
            },

            {
                problem: "Un moteur tourne dans le mauvais sens.",
                solution:
                    "Vérifiez le branchement du moteur et la logique de commande du driver. Le sens de rotation doit être cohérent avec le côté du robot."
            },

            {
                problem: "Les moteurs fonctionnent de manière irrégulière.",
                solution:
                    "Vérifiez l'alimentation, les connexions et la charge de la batterie. Vérifiez également que le driver reçoit correctement les signaux de commande."
            }
        ],

        safety:
            "Avant toute modification du câblage, coupez l'alimentation du robot. Fixez correctement les moteurs et les roues. Évitez de toucher les parties mobiles lorsque le robot est en fonctionnement. Utilisez une alimentation adaptée aux composants et vérifiez les connexions avant chaque test.",

        improvements: [

            "Utiliser trois capteurs ou davantage pour améliorer la détection.",

            "Ajouter une commande PID pour obtenir des corrections plus précises.",

            "Ajouter un réglage automatique de la vitesse.",

            "Ajouter un écran pour afficher les valeurs des capteurs.",

            "Ajouter une télécommande pour passer entre plusieurs modes.",

            "Enregistrer les données des capteurs pendant le déplacement.",

            "Créer un système capable de détecter les intersections.",

            "Ajouter un mode permettant de mémoriser un parcours."
        ],

        educational:
            "Ce projet permet d'étudier les capteurs infrarouges, les moteurs DC, les drivers de puissance, les entrées numériques, le PWM et la programmation conditionnelle. Il constitue également une première introduction aux systèmes autonomes capables de prendre des décisions à partir de mesures de capteurs.",

        conclusion:
            "Le robot suiveur de ligne est un projet classique de robotique qui combine détection, commande des moteurs et prise de décision automatique. Il permet de comprendre comment un système peut observer son environnement grâce à des capteurs et modifier son comportement en fonction des informations reçues."
    },


    ar: {
        title: "روبوت متتبع الخط",

        description:
            "إنجاز روبوت متحرك قادر على اكتشاف خط موجود على الأرض وتعديل مساره تلقائيًا. يستعمل الروبوت حساسات الأشعة تحت الحمراء للتمييز بين الخط والسطح، ثم يتحكم في محركين DC للمحافظة على مساره.",

        tags: [
            "Arduino",
            "حساسات IR",
            "محركات DC",
            "L298N",
            "روبوت مستقل",
            "تتبع الخط"
        ],

        material: [
            "Arduino Uno",
            "محركان DC",
            "Driver L298N",
            "حساسان أو ثلاثة حساسات IR",
            "هيكل روبوت",
            "عجلتان محركتان",
            "عجلة حرة",
            "بطارية مناسبة",
            "أسلاك Dupont",
            "مفتاح تشغيل",
            "براغي وقطع تثبيت"
        ],

        componentsDetails: [

            {
                name: "Arduino Uno",
                explanation:
                    "تستقبل Arduino معلومات حساسات الأشعة تحت الحمراء وتحدد الاتجاه الذي يجب أن يسلكه الروبوت. بعد ذلك تتحكم في Driver المحركات لتغيير سرعة واتجاه دوران المحركات."
            },

            {
                name: "حساسات الأشعة تحت الحمراء",
                explanation:
                    "تسمح حساسات IR باكتشاف الفرق بين الخط والسطح. ترسل وتستقبل الأشعة تحت الحمراء ثم تقدم معلومات إلى Arduino حسب السطح الموجود أمامها."
            },

            {
                name: "محركات DC",
                explanation:
                    "تقوم المحركات بتحريك عجلات الروبوت. ومن خلال تغيير سرعة المحرك الأيسر أو الأيمن يمكن للروبوت التقدم أو الانحراف أو الدوران إلى اليمين أو اليسار."
            },

            {
                name: "Driver L298N",
                explanation:
                    "يسمح L298N لـArduino بالتحكم في محركات DC، ويعمل كواجهة بين إشارات التحكم الصادرة من Arduino والطاقة اللازمة للمحركات."
            },

            {
                name: "هيكل الروبوت",
                explanation:
                    "يحمل الهيكل جميع مكونات الروبوت ويعطيه الشكل الميكانيكي. يساعد تثبيت المحركات والحساسات بشكل جيد على الحصول على حركة أكثر استقرارًا."
            },

            {
                name: "العجلة الحرة",
                explanation:
                    "تساعد العجلة الحرة على دعم جزء من وزن الروبوت مع السماح للعجلتين المحركتين بالتحكم في اتجاه الحركة."
            }
        ],

        principle:
            "يعتمد الروبوت على معلومات حساسات الأشعة تحت الحمراء لمعرفة مكان الخط بالنسبة إليه. عندما يكون الخط في الموضع الصحيح يتحرك المحركان إلى الأمام. إذا انحرف الروبوت عن الخط إلى أحد الجانبين، يتم تغيير سرعة المحركات لتصحيح المسار. وتتكرر عملية القراءة والتصحيح باستمرار.",

        mechanicalAssembly:
            "ابدأ بتحضير الهيكل وتثبيت محركي DC بشكل متوازن. ثم ثبت العجلتين المحركتين وأضف العجلة الحرة. يجب وضع حساسات الأشعة تحت الحمراء في مقدمة الروبوت وعلى ارتفاع مناسب عن الأرض. يجب أن تكون قريبة بما يكفي من المسار للكشف الجيد دون أن تلامسه.",

        electricalAssembly:
            "يتم ربط المحركات مع Driver L298N، ثم يستقبل الـDriver إشارات التحكم من Arduino ويقوم بتوفير التحكم المناسب للمحركات. يتم ربط حساسات IR بمداخل Arduino. يجب استعمال مصدر طاقة مناسب وربط الأرضي بطريقة صحيحة.",

        wiring:
            "يتم توصيل مخارج حساسات IR بمداخل Arduino. أما مداخل التحكم في L298N فتربط بالمخارج الرقمية في Arduino. ويتم ربط المحركات بمخارج الـDriver، بينما يتم توصيل الطاقة حسب مواصفات المحركات والـDriver.",

        wiringDetails: [

            "ثبت حساسات الأشعة تحت الحمراء في مقدمة الهيكل.",

            "قم بتوصيل الطاقة وGND لكل حساس.",

            "صل مخارج الحساسات بالمداخل المناسبة في Arduino.",

            "صل المحرك الأيسر بالمخارج المناسبة في L298N.",

            "صل المحرك الأيمن بالمخارج الأخرى في L298N.",

            "صل مداخل التحكم الخاصة بـL298N بالمخارج الرقمية في Arduino.",

            "صل مصدر الطاقة حسب مواصفات المحركات والـDriver.",

            "تأكد من ربط GND بين Arduino والـDriver والحساسات عند الحاجة.",

            "تحقق من جميع التوصيلات قبل تشغيل الروبوت.",

            "اختبر كل حساس بشكل منفصل قبل تشغيل برنامج تتبع الخط."
        ],

        algorithm:
            "يقوم البرنامج بقراءة حالة حساسات IR باستمرار. إذا كان الخط في المنتصف يتحرك المحركان إلى الأمام. إذا اكتشف الحساس الأيسر الخط، يقوم البرنامج بتصحيح المسار باتجاه اليسار، وإذا اكتشف الحساس الأيمن الخط يتم التصحيح باتجاه اليمين. استعمال ثلاثة حساسات يسمح بالحصول على معلومات أكثر عن موقع الخط.",

        programming:
            "يبدأ برنامج Arduino بتحديد منافذ الحساسات ومنافذ التحكم في L298N. داخل الحلقة الرئيسية تتم قراءة الحساسات ثم مقارنة النتائج مع الحالات المختلفة. بعد ذلك يختار البرنامج الحركة المناسبة مثل التقدم أو إبطاء أحد المحركات أو الدوران أو التوقف. ويمكن استعمال PWM للتحكم في سرعة المحركات.",

        steps: [

            "دراسة مبدأ عمل روبوت تتبع الخط.",

            "تحديد المكونات المطلوبة.",

            "تحضير الهيكل.",

            "تثبيت محركي DC.",

            "تركيب العجلتين المحركتين.",

            "تركيب العجلة الحرة.",

            "وضع حساسات IR في مقدمة الروبوت.",

            "ضبط ارتفاع الحساسات بالنسبة للأرض.",

            "توصيل الحساسات مع Arduino.",

            "تركيب Driver L298N.",

            "توصيل المحركات بالـDriver.",

            "ربط الـDriver بمخارج التحكم في Arduino.",

            "فحص التوصيلات الكهربائية.",

            "تشغيل الروبوت.",

            "اختبار كل حساس بشكل منفصل.",

            "التأكد من القيم التي ترسلها الحساسات.",

            "اختبار المحرك الأيسر.",

            "اختبار المحرك الأيمن.",

            "التأكد من اتجاه دوران المحركين.",

            "تحميل برنامج تتبع الخط.",

            "وضع الروبوت على مسار مستقيم.",

            "مراقبة استجابة الحساسات.",

            "تعديل مكان وارتفاع الحساسات.",

            "تعديل سرعة المحركات تدريجيًا.",

            "اختبار الروبوت على المنحنيات وتغييرات الاتجاه."
        ],

        testing:
            "ابدأ باختبار الحساسات دون تحريك الروبوت. بعد ذلك ضع الروبوت على جزء مستقيم من المسار وتحقق من استجابته. ثم جرب المنعطفات البسيطة والمنحنيات الأصعب. يجب إجراء التعديلات تدريجيًا حتى لا يفقد الروبوت الخط بسرعة.",

        calibration:
            "تتم المعايرة أساسًا لمعرفة استجابة الحساسات حسب السطح المستخدم. يؤثر ارتفاع الحساسات واتجاهها وموقعها بالنسبة للروبوت على النتائج. كما يجب ضبط سرعة المحركات حتى يتمكن الروبوت من تصحيح مساره دون القيام بحركات مفاجئة.",

        commonProblems: [

            {
                problem: "الروبوت لا يكتشف الخط.",
                solution:
                    "تحقق من طاقة الحساسات وتوصيلاتها وارتفاعها عن الأرض وإعداد حساسيتها إذا كان يحتوي على إعداد خاص بذلك."
            },

            {
                problem: "الروبوت يدور باستمرار إلى جهة واحدة.",
                solution:
                    "تحقق من موضع الحساسات واتجاه دوران المحركات ومن الشروط الموجودة في البرنامج."
            },

            {
                problem: "الروبوت يتحرك لكنه لا يصحح مساره.",
                solution:
                    "تحقق من وصول إشارات الحساسات إلى Arduino ومن صحة شروط التصحيح في البرنامج."
            },

            {
                problem: "الروبوت يفقد الخط في المنعطفات.",
                solution:
                    "قلل السرعة تدريجيًا وحسن مكان الحساسات. ويمكن استعمال عدد أكبر من الحساسات للحصول على معلومات أفضل."
            },

            {
                problem: "أحد المحركات يدور في الاتجاه الخاطئ.",
                solution:
                    "تحقق من توصيل المحرك ومن منطق التحكم في الـDriver، ويجب أن يكون اتجاه الدوران مناسبًا لجانب الروبوت."
            },

            {
                problem: "المحركات تعمل بشكل غير منتظم.",
                solution:
                    "تحقق من مصدر الطاقة والتوصيلات وحالة البطارية، وتأكد من وصول إشارات التحكم بشكل صحيح إلى Driver."
            }
        ],

        safety:
            "قبل تغيير أي توصيل كهربائي افصل الطاقة عن الروبوت. ثبت المحركات والعجلات جيدًا، وتجنب لمس الأجزاء المتحركة أثناء التشغيل. استعمل مصدر طاقة مناسبًا للمكونات وافحص التوصيلات قبل كل اختبار.",

        improvements: [

            "استعمال ثلاثة حساسات أو أكثر لتحسين اكتشاف الخط.",

            "إضافة تحكم PID للحصول على تصحيح أكثر دقة.",

            "إضافة ضبط تلقائي لسرعة المحركات.",

            "إضافة شاشة لعرض قيم الحساسات.",

            "إضافة جهاز تحكم للتبديل بين أوضاع التشغيل.",

            "تسجيل بيانات الحساسات أثناء الحركة.",

            "إنشاء نظام لاكتشاف التقاطعات.",

            "إضافة وضع يسمح بحفظ المسار وإعادة تنفيذه."
        ],

        educational:
            "يسمح هذا المشروع بدراسة حساسات الأشعة تحت الحمراء ومحركات DC وDrivers القدرة والمداخل الرقمية وPWM والبرمجة باستعمال الشروط. كما يمثل مقدمة مهمة للأنظمة المستقلة التي تستطيع اتخاذ قرارات اعتمادًا على المعلومات التي تحصل عليها من الحساسات.",

        conclusion:
            "روبوت تتبع الخط من المشاريع الأساسية في مجال الروبوتيك، لأنه يجمع بين الاستشعار والتحكم في المحركات واتخاذ القرار بشكل تلقائي. ومن خلاله يمكن فهم كيف يستطيع نظام روبوتي مراقبة محيطه بواسطة الحساسات وتغيير سلوكه بناءً على المعلومات التي يحصل عليها."
    }
},
   
{
    id: 5,

    icon: "🤖🚧",

    fr: {
        title: "Robot Éviteur d'Obstacles",

        description:
            "Construisez un robot mobile autonome capable de détecter les obstacles à l'aide d'un capteur ultrasonique et de modifier automatiquement sa trajectoire pour éviter les collisions.",

        tags: [
            "Arduino",
            "HC-SR04",
            "Ultrason",
            "Servomoteur",
            "Moteurs DC",
            "L298N",
            "Robot autonome"
        ],

        material: [
            "Arduino Uno",
            "Capteur ultrasonique HC-SR04",
            "Servomoteur",
            "2 moteurs DC",
            "Driver moteur L298N",
            "Châssis robotique",
            "2 roues motrices",
            "Roue libre",
            "Batterie adaptée",
            "Fils Dupont",
            "Interrupteur",
            "Vis et supports de fixation"
        ],

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "Arduino constitue le contrôleur principal du robot. Il reçoit la distance mesurée par le capteur et commande les moteurs selon la situation détectée."
            },
            {
                name: "HC-SR04",
                explanation:
                    "Le capteur ultrasonique mesure la distance entre le robot et l'obstacle situé devant lui. Arduino utilise cette information pour décider de continuer, de s'arrêter ou de changer de direction."
            },
            {
                name: "Servomoteur",
                explanation:
                    "Le servomoteur permet d'orienter le capteur ultrasonique vers différentes directions afin d'examiner l'environnement autour du robot."
            },
            {
                name: "L298N",
                explanation:
                    "Le driver L298N permet à Arduino de contrôler le sens de rotation et la commande des deux moteurs DC."
            },
            {
                name: "Moteurs DC",
                explanation:
                    "Les moteurs entraînent les roues du robot. En contrôlant séparément les deux moteurs, le robot peut avancer, reculer et tourner."
            },
            {
                name: "Châssis",
                explanation:
                    "Le châssis constitue la structure mécanique qui supporte Arduino, le capteur, les moteurs, la batterie et les autres composants."
            }
        ],

        principle:
            "Le robot mesure continuellement la distance qui le sépare d'un obstacle grâce au HC-SR04. Lorsque la distance est suffisante, il continue d'avancer. Lorsqu'un obstacle est détecté, le robot ralentit ou s'arrête et recherche une direction plus libre. Le servomoteur peut orienter le capteur vers la gauche et vers la droite afin de comparer les distances et choisir une trajectoire.",

        mechanicalAssembly:
            "Commencez par fixer les moteurs DC sur les côtés du châssis. Installez ensuite les roues et la roue libre. Fixez Arduino et le driver L298N sur une position stable. Le servomoteur doit être correctement fixé à l'avant afin de pouvoir orienter le capteur ultrasonique. Placez la batterie de manière stable afin d'éviter qu'elle ne se déplace pendant le fonctionnement.",

        electricalAssembly:
            "Les moteurs sont connectés au driver L298N. Le driver reçoit les commandes d'Arduino et permet de contrôler les moteurs. Le HC-SR04 est connecté aux broches numériques d'Arduino pour envoyer et recevoir les signaux ultrasoniques. Le servomoteur est connecté à une sortie adaptée pour recevoir son signal de commande. Toutes les connexions doivent être vérifiées avant la mise sous tension.",

        wiring:
            "Le HC-SR04 mesure la distance et transmet les informations à Arduino. Arduino commande ensuite le L298N pour contrôler les moteurs et le servomoteur pour orienter le capteur.",

        wiringDetails: [
            "Connecter l'alimentation du HC-SR04 à une alimentation compatible.",
            "Relier la broche TRIG du HC-SR04 à une sortie numérique d'Arduino.",
            "Relier la broche ECHO du HC-SR04 à une autre entrée numérique d'Arduino.",
            "Connecter le servomoteur à une alimentation adaptée et relier son signal à une sortie de commande d'Arduino.",
            "Connecter les deux moteurs DC aux sorties du driver L298N.",
            "Relier les entrées de commande du L298N aux sorties numériques d'Arduino.",
            "Connecter l'alimentation du driver selon les caractéristiques du matériel utilisé.",
            "Vérifier que les connexions d'alimentation et de masse sont correctement réalisées.",
            "Fixer les câbles afin qu'ils ne touchent pas les roues ou les parties mobiles.",
            "Effectuer une dernière vérification du câblage avant d'alimenter le robot."
        ],

        algorithm:
            "Le programme lit continuellement la distance devant le robot. Si la distance est supérieure à une valeur de sécurité, les moteurs avancent. Si un obstacle est détecté, le robot arrête ou ralentit ses moteurs. Le servomoteur peut ensuite orienter le capteur vers la gauche et vers la droite. Le programme compare les distances mesurées et choisit la direction présentant le plus d'espace libre.",

        programming:
            "Le programme Arduino utilise une fonction de mesure de distance avec le HC-SR04, des fonctions de commande des moteurs et une commande du servomoteur. Une structure conditionnelle permet de choisir automatiquement le comportement du robot selon la distance détectée.",

        steps: [
            "Préparer le châssis du robot.",
            "Installer les deux moteurs DC.",
            "Fixer les roues sur les moteurs.",
            "Installer la roue libre à l'avant ou à l'arrière du châssis.",
            "Fixer Arduino sur le châssis.",
            "Installer le driver L298N.",
            "Fixer le servomoteur à l'avant du robot.",
            "Installer le capteur HC-SR04 sur le servomoteur.",
            "Connecter le HC-SR04 à Arduino.",
            "Connecter le servomoteur à Arduino.",
            "Connecter les moteurs au L298N.",
            "Relier le L298N à Arduino.",
            "Installer la batterie dans une position stable.",
            "Vérifier toutes les connexions.",
            "Téléverser le programme Arduino.",
            "Tester le capteur ultrasonique.",
            "Vérifier que la distance mesurée change lorsqu'un objet se rapproche.",
            "Tester les moteurs séparément.",
            "Tester le déplacement vers l'avant.",
            "Placer un obstacle devant le robot.",
            "Vérifier que le robot détecte l'obstacle.",
            "Tester l'orientation du capteur vers la gauche et la droite.",
            "Comparer les distances disponibles.",
            "Ajuster les paramètres du programme.",
            "Effectuer un test final sur un parcours dégagé."
        ],

        testing:
            "Commencez par tester le HC-SR04 sans faire fonctionner les moteurs. Vérifiez ensuite le mouvement des moteurs séparément. Une fois ces tests terminés, placez un obstacle à différentes distances et observez la réaction du robot. Les essais doivent être réalisés progressivement afin d'identifier facilement les éventuels problèmes.",

        calibration:
            "La calibration consiste principalement à vérifier la précision du capteur ultrasonique, la position centrale du servomoteur et la réponse des moteurs. Il peut également être nécessaire d'ajuster la distance à laquelle le robot considère qu'un obstacle est dangereux.",

        commonProblems: [
            {
                problem: "Le HC-SR04 ne détecte pas correctement les obstacles.",
                solution:
                    "Vérifiez les connexions TRIG et ECHO, l'alimentation du capteur et la fonction de mesure de distance dans le programme."
            },
            {
                problem: "Le robot avance même lorsqu'un obstacle est proche.",
                solution:
                    "Vérifiez la condition utilisée dans le programme et ajustez la distance minimale de détection."
            },
            {
                problem: "Un seul moteur fonctionne.",
                solution:
                    "Vérifiez les connexions entre le moteur concerné et le L298N ainsi que les sorties de commande utilisées dans le programme."
            },
            {
                problem: "Le robot tourne toujours du même côté.",
                solution:
                    "Vérifiez les moteurs, les connexions et la logique de décision utilisée pour comparer les distances."
            },
            {
                problem: "Le servomoteur ne tourne pas correctement.",
                solution:
                    "Vérifiez son alimentation, son câble de signal et les angles définis dans le programme."
            },
            {
                problem: "Le robot se comporte de manière irrégulière.",
                solution:
                    "Vérifiez l'alimentation, les connexions de masse, la fixation mécanique et les valeurs utilisées dans le programme."
            }
        ],

        safety:
            "Avant toute modification du câblage, coupez l'alimentation du robot. Évitez de placer les doigts ou des objets près des roues et des parties mobiles lorsque les moteurs fonctionnent. Utilisez une alimentation adaptée aux composants et vérifiez les connexions avant chaque essai.",

        improvements: [
            "Ajouter davantage de capteurs ultrasoniques.",
            "Utiliser plusieurs capteurs infrarouges pour améliorer la détection.",
            "Ajouter un écran pour afficher la distance mesurée.",
            "Ajouter des LED indiquant l'état du robot.",
            "Ajouter un buzzer pour signaler la détection d'un obstacle.",
            "Améliorer l'algorithme de choix de direction.",
            "Ajouter différents modes de fonctionnement.",
            "Créer une commande Bluetooth pour contrôler le robot manuellement.",
            "Ajouter une fonction permettant au robot de mémoriser temporairement son trajet."
        ],

        educational:
            "Ce projet permet d'étudier la robotique autonome, les capteurs ultrasoniques, les servomoteurs, les moteurs DC, les drivers de moteurs et la programmation Arduino. Il permet également de comprendre comment un robot peut prendre une décision simple à partir des informations fournies par ses capteurs.",

        conclusion:
            "Le robot éviteur d'obstacles constitue un excellent projet pour comprendre les bases de la robotique autonome. Il combine la détection par capteur, la prise de décision, la commande des moteurs et la programmation afin de créer un système capable de réagir à son environnement."
    },

    ar: {
        title: "روبوت متجنب العوائق",

        description:
            "قم ببناء روبوت متنقل مستقل قادر على اكتشاف العوائق باستعمال حساس الموجات فوق الصوتية وتغيير مساره تلقائيًا لتجنب الاصطدام.",

        tags: [
            "Arduino",
            "HC-SR04",
            "Ultrason",
            "Servomoteur",
            "محركات DC",
            "L298N",
            "روبوت مستقل"
        ],

        material: [
            "Arduino Uno",
            "حساس الموجات فوق الصوتية HC-SR04",
            "محرك Servo",
            "محركان DC",
            "Driver L298N",
            "هيكل روبوت",
            "عجلتان متصلتان بالمحركات",
            "عجلة حرة",
            "بطارية مناسبة",
            "أسلاك Dupont",
            "مفتاح تشغيل",
            "براغي وحوامل تثبيت"
        ],

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "تعتبر Arduino وحدة التحكم الرئيسية في الروبوت. تستقبل المسافة التي يقيسها الحساس ثم تتحكم في المحركات حسب الوضع الذي تم اكتشافه."
            },
            {
                name: "HC-SR04",
                explanation:
                    "يقيس الحساس فوق الصوتي المسافة بين الروبوت والعائق الموجود أمامه. تستعمل Arduino هذه المعلومات لتحديد ما إذا كان الروبوت سيواصل السير أو يتوقف أو يغير اتجاهه."
            },
            {
                name: "Servomoteur",
                explanation:
                    "يسمح محرك Servo بتوجيه الحساس فوق الصوتي نحو اتجاهات مختلفة حتى يتمكن الروبوت من فحص المنطقة المحيطة به."
            },
            {
                name: "L298N",
                explanation:
                    "يسمح Driver L298N لـ Arduino بالتحكم في اتجاه دوران وسرعة تشغيل محركي DC حسب طريقة التوصيل والبرنامج."
            },
            {
                name: "محركات DC",
                explanation:
                    "تقوم المحركات بتحريك عجلات الروبوت. ومن خلال التحكم في كل محرك بشكل مستقل يستطيع الروبوت التقدم والتراجع والدوران."
            },
            {
                name: "هيكل الروبوت",
                explanation:
                    "يمثل الهيكل القاعدة الميكانيكية التي تحمل Arduino والحساس والمحركات والبطارية وبقية المكونات."
            }
        ],

        principle:
            "يقيس الروبوت باستمرار المسافة بينه وبين العائق باستعمال حساس HC-SR04. إذا كانت المسافة كافية فإنه يواصل التقدم. وعندما يكتشف عائقًا فإنه يبطئ أو يتوقف ثم يبحث عن اتجاه أكثر فراغًا. يمكن لمحرك Servo توجيه الحساس نحو اليسار واليمين لمقارنة المسافات واختيار المسار المناسب.",

        mechanicalAssembly:
            "ابدأ بتثبيت محركي DC على جانبي الهيكل، ثم قم بتركيب العجلات والعجلة الحرة. ثبّت Arduino وDriver L298N في مكان ثابت. بعد ذلك قم بتثبيت محرك Servo في الجزء الأمامي حتى يتمكن من توجيه حساس HC-SR04. ضع البطارية في مكان ثابت حتى لا تتحرك أثناء عمل الروبوت.",

        electricalAssembly:
            "يتم توصيل محركات DC مع Driver L298N الذي يستقبل أوامر Arduino للتحكم في المحركات. يتم توصيل HC-SR04 بالمنافذ الرقمية في Arduino لإرسال واستقبال الإشارات فوق الصوتية. كما يتم توصيل Servo بمنفذ مناسب لإرسال إشارة التحكم. يجب التأكد من جميع التوصيلات قبل تشغيل النظام.",

        wiring:
            "يقيس حساس HC-SR04 المسافة ويرسل المعلومات إلى Arduino. تقوم Arduino بعد ذلك بالتحكم في Driver L298N لتشغيل المحركات، كما تتحكم في Servo لتوجيه الحساس.",

        wiringDetails: [
            "توصيل تغذية HC-SR04 بطريقة متوافقة مع مواصفات الحساس.",
            "توصيل منفذ TRIG في HC-SR04 بمنفذ رقمي في Arduino.",
            "توصيل منفذ ECHO بمنفذ رقمي آخر في Arduino.",
            "توصيل محرك Servo بتغذية مناسبة وربط سلك الإشارة بمنفذ تحكم في Arduino.",
            "توصيل محركي DC بمخارج Driver L298N.",
            "ربط مداخل التحكم في L298N بالمخارج الرقمية في Arduino.",
            "توصيل مصدر الطاقة الخاص بالـ Driver وفقًا لمواصفات المكونات المستعملة.",
            "التأكد من صحة توصيلات الطاقة والأرضي.",
            "تثبيت الأسلاك حتى لا تلامس العجلات أو الأجزاء المتحركة.",
            "فحص جميع التوصيلات مرة أخيرة قبل تشغيل الروبوت."
        ],

        algorithm:
            "يقرأ البرنامج المسافة أمام الروبوت بشكل مستمر. إذا كانت المسافة أكبر من القيمة المحددة للأمان، تتحرك المحركات إلى الأمام. عند اكتشاف عائق، يقوم الروبوت بإيقاف أو إبطاء المحركات. بعد ذلك يمكن لمحرك Servo توجيه الحساس إلى اليسار واليمين. يقارن البرنامج المسافات المتاحة ويختار الاتجاه الذي يحتوي على مساحة أكبر.",

        programming:
            "يعتمد برنامج Arduino على وظيفة لقياس المسافة بواسطة HC-SR04، بالإضافة إلى وظائف للتحكم في المحركات وServo. تستعمل الشروط البرمجية لتحديد سلوك الروبوت تلقائيًا حسب المسافة التي تم اكتشافها.",

        steps: [
            "تحضير هيكل الروبوت.",
            "تركيب محركي DC.",
            "تثبيت العجلات على المحركات.",
            "تركيب العجلة الحرة في الجزء الأمامي أو الخلفي.",
            "تثبيت Arduino على الهيكل.",
            "تثبيت Driver L298N.",
            "تثبيت محرك Servo في مقدمة الروبوت.",
            "تثبيت حساس HC-SR04 فوق محرك Servo.",
            "توصيل HC-SR04 مع Arduino.",
            "توصيل Servo مع Arduino.",
            "توصيل المحركات مع L298N.",
            "ربط L298N مع Arduino.",
            "تثبيت البطارية في مكان آمن ومستقر.",
            "فحص جميع التوصيلات.",
            "رفع البرنامج إلى Arduino.",
            "اختبار حساس الموجات فوق الصوتية.",
            "التأكد من تغير المسافة عند اقتراب جسم من الحساس.",
            "اختبار المحركات بشكل منفصل.",
            "اختبار حركة الروبوت إلى الأمام.",
            "وضع عائق أمام الروبوت.",
            "التأكد من قدرة الروبوت على اكتشاف العائق.",
            "اختبار توجيه الحساس إلى اليسار واليمين.",
            "مقارنة المسافات المتاحة.",
            "تعديل إعدادات البرنامج حسب الحاجة.",
            "إجراء اختبار نهائي في مكان مناسب وخالٍ من العوائق غير المتوقعة."
        ],

        testing:
            "ابدأ باختبار HC-SR04 دون تشغيل المحركات. بعد ذلك اختبر كل محرك بشكل منفصل. ثم ضع عائقًا على مسافات مختلفة أمام الروبوت وراقب استجابته. يجب إجراء الاختبارات تدريجيًا حتى يسهل اكتشاف أي مشكلة في الحساس أو المحركات أو البرنامج.",

        calibration:
            "تتم المعايرة من خلال التأكد من دقة قراءة حساس HC-SR04، وضبط الوضع الأوسط لمحرك Servo، والتأكد من استجابة المحركات بشكل صحيح. ويمكن أيضًا تعديل المسافة التي يعتبر عندها الروبوت أن العائق قريب وخطير.",

        commonProblems: [
            {
                problem: "الحساس HC-SR04 لا يكتشف العوائق بشكل صحيح.",
                solution:
                    "تحقق من توصيل TRIG وECHO ومن مصدر الطاقة، وكذلك من طريقة حساب المسافة داخل البرنامج."
            },
            {
                problem: "الروبوت يواصل السير رغم وجود عائق قريب.",
                solution:
                    "تحقق من الشرط البرمجي المستخدم للكشف عن العائق واضبط المسافة الدنيا المطلوبة."
            },
            {
                problem: "محرك واحد فقط يعمل.",
                solution:
                    "تحقق من توصيل المحرك مع L298N ومن مخارج التحكم المستعملة في البرنامج."
            },
            {
                problem: "الروبوت يدور دائمًا في نفس الاتجاه.",
                solution:
                    "تحقق من المحركات والتوصيلات ومن منطق مقارنة المسافات داخل البرنامج."
            },
            {
                problem: "محرك Servo لا يتحرك بشكل صحيح.",
                solution:
                    "تحقق من التغذية وسلك الإشارة ومن الزوايا المحددة في البرنامج."
            },
            {
                problem: "الروبوت يتحرك بطريقة غير مستقرة.",
                solution:
                    "تحقق من مصدر الطاقة، وتوصيلات الأرضي، والتثبيت الميكانيكي، والقيم المستعملة في البرنامج."
            }
        ],

        safety:
            "قبل تغيير أي توصيل كهربائي، افصل مصدر الطاقة عن الروبوت. تجنب وضع الأصابع أو الأشياء قرب العجلات والأجزاء المتحركة أثناء تشغيل المحركات. استعمل مصدر طاقة مناسبًا للمكونات وتأكد من جميع التوصيلات قبل كل تجربة.",

        improvements: [
            "إضافة حساسات فوق صوتية إضافية.",
            "استعمال حساسات Infrared لتحسين اكتشاف العوائق.",
            "إضافة شاشة لعرض المسافة المقاسة.",
            "إضافة مصابيح LED لإظهار حالة الروبوت.",
            "إضافة Buzzer للتنبيه عند اكتشاف عائق.",
            "تحسين خوارزمية اختيار الاتجاه.",
            "إضافة أوضاع تشغيل مختلفة.",
            "إضافة Bluetooth للتحكم اليدوي في الروبوت.",
            "إضافة إمكانية تسجيل مسار الروبوت بشكل مؤقت."
        ],

        educational:
            "يسمح هذا المشروع بدراسة أساسيات الروبوتات المستقلة، والحساسات فوق الصوتية، ومحركات Servo، ومحركات DC، وDrivers الخاصة بالمحركات، وبرمجة Arduino. كما يساعد على فهم كيفية اتخاذ الروبوت قرارًا بسيطًا اعتمادًا على المعلومات التي توفرها الحساسات.",

        conclusion:
            "يعتبر روبوت تجنب العوائق مشروعًا ممتازًا لفهم أساسيات الروبوتات المستقلة. فهو يجمع بين اكتشاف العوائق، واتخاذ القرار، والتحكم في المحركات، والبرمجة لإنشاء نظام قادر على التفاعل مع البيئة المحيطة به."
    }
},
   {
    id: 6,

    icon: "🏠💡",

    fr: {
        title: "Smart Home",

        description:
            "Réalisez une mini-maison intelligente capable de surveiller son environnement et de contrôler automatiquement ses lumières et différents équipements grâce à un ESP32, des capteurs et des modules relais.",

        tags: [
            "ESP32",
            "Smart Home",
            "IoT",
            "Wi-Fi",
            "Relais",
            "Capteurs",
            "Automatisation"
        ],

        material: [
            "ESP32",
            "Module relais adapté",
            "LED",
            "Résistances pour LED",
            "Capteur de luminosité",
            "Capteur de température",
            "Capteur de mouvement PIR",
            "Fils Dupont",
            "Plaque d'essai",
            "Mini-maison ou maquette",
            "Alimentation adaptée",
            "Interrupteur"
        ],

        componentsDetails: [
            {
                name: "ESP32",
                explanation:
                    "L'ESP32 est le cerveau de la maison intelligente. Il lit les informations provenant des capteurs et commande automatiquement les différents équipements. Il dispose également d'une connexion Wi-Fi permettant d'envisager une commande à distance."
            },
            {
                name: "Capteur de luminosité",
                explanation:
                    "Le capteur de luminosité permet de déterminer si l'environnement est clair ou sombre. Le système peut utiliser cette information pour commander automatiquement les lumières."
            },
            {
                name: "Capteur PIR",
                explanation:
                    "Le capteur PIR détecte les mouvements d'une personne. Il peut être utilisé pour allumer automatiquement une lumière lorsqu'un mouvement est détecté."
            },
            {
                name: "Capteur de température",
                explanation:
                    "Le capteur de température permet de surveiller la température intérieure et peut servir à déclencher différentes actions selon la programmation."
            },
            {
                name: "Module relais",
                explanation:
                    "Le relais permet à l'ESP32 de commander des équipements compatibles avec le système. Pour une maquette pédagogique, il est recommandé de commander uniquement des charges basse tension adaptées."
            },
            {
                name: "LED",
                explanation:
                    "Les LED représentent les systèmes d'éclairage de la maison. Elles permettent de visualiser facilement les commandes envoyées par l'ESP32."
            },
            {
                name: "Wi-Fi",
                explanation:
                    "La connexion Wi-Fi intégrée à l'ESP32 permet de créer des fonctions IoT, comme l'affichage des données ou la commande de la maquette depuis une interface adaptée."
            }
        ],

        principle:
            "La maison intelligente fonctionne selon le principe de l'automatisation. Les capteurs observent l'environnement et transmettent leurs informations à l'ESP32. Celui-ci analyse les données et prend une décision selon les conditions programmées. Par exemple, si la luminosité est faible et qu'un mouvement est détecté, l'ESP32 peut commander l'allumage d'une LED.",

        mechanicalAssembly:
            "Commencez par préparer une petite maquette représentant les différentes pièces de la maison. Placez les LED dans les zones représentant les lampes. Fixez les capteurs à des endroits permettant de représenter leur fonction : le capteur de luminosité dans une zone exposée à la lumière, le capteur PIR à l'entrée ou dans une pièce et le capteur de température dans une zone centrale.",

        electricalAssembly:
            "Les capteurs sont reliés aux entrées de l'ESP32 tandis que les LED et les modules de commande sont reliés aux sorties. Pour une maquette pédagogique, privilégiez les LED et autres charges basse tension. Les connexions doivent être vérifiées avant la mise sous tension afin d'éviter les erreurs de câblage.",

        wiring:
            "Les capteurs transmettent leurs mesures à l'ESP32. Celui-ci traite les données et commande les LED ou les modules relais selon les conditions définies dans le programme.",

        wiringDetails: [
            "Installer l'ESP32 sur une plaque d'essai ou un support stable.",
            "Connecter le capteur de luminosité à une entrée adaptée de l'ESP32.",
            "Connecter le capteur PIR à une entrée numérique.",
            "Connecter le capteur de température à l'ESP32 selon son type.",
            "Connecter les LED aux sorties de l'ESP32 avec les résistances appropriées.",
            "Connecter le module relais à une sortie de commande de l'ESP32.",
            "Vérifier les connexions d'alimentation et de masse.",
            "Organiser les câbles afin d'éviter les courts-circuits et les connexions accidentelles.",
            "Programmer l'ESP32 avec les conditions de fonctionnement souhaitées.",
            "Tester chaque capteur et chaque sortie séparément avant le test automatique complet."
        ],

        algorithm:
            "Le programme commence par initialiser l'ESP32 et les différents capteurs. Il lit ensuite régulièrement les données de luminosité, de mouvement et de température. Selon les valeurs obtenues, il décide d'allumer ou d'éteindre les lumières et de commander les différents équipements. Une partie du programme peut également gérer la communication Wi-Fi.",

        programming:
            "La programmation peut être réalisée avec l'environnement Arduino IDE et les bibliothèques adaptées à l'ESP32. Le programme utilise des entrées pour lire les capteurs et des sorties pour commander les LED ou les modules de commande. Des conditions if/else permettent de créer les automatismes de la maison.",

        steps: [
            "Préparer la maquette de la maison.",
            "Définir les différentes pièces et leurs fonctions.",
            "Installer l'ESP32.",
            "Installer les LED représentant les éclairages.",
            "Installer le capteur de luminosité.",
            "Installer le capteur PIR.",
            "Installer le capteur de température.",
            "Connecter les capteurs à l'ESP32.",
            "Connecter les LED avec leurs résistances.",
            "Installer le module relais pour la partie basse tension de la maquette.",
            "Vérifier toutes les connexions.",
            "Programmer les entrées et les sorties.",
            "Téléverser le programme dans l'ESP32.",
            "Tester le capteur de luminosité.",
            "Tester le capteur de mouvement.",
            "Tester le capteur de température.",
            "Tester chaque LED séparément.",
            "Créer les conditions d'allumage automatique.",
            "Créer les conditions d'extinction automatique.",
            "Tester le fonctionnement en présence de mouvement.",
            "Tester le fonctionnement dans différentes conditions de luminosité.",
            "Vérifier la réponse du système aux changements de température.",
            "Configurer la connexion Wi-Fi si elle est utilisée.",
            "Tester le fonctionnement automatique complet.",
            "Améliorer le programme et l'organisation de la maquette."
        ],

        testing:
            "Les tests doivent être réalisés progressivement. Commencez par vérifier chaque capteur individuellement, puis testez chaque LED et chaque sortie. Ensuite, activez les automatismes et vérifiez que les actions correspondent correctement aux conditions détectées.",

        calibration:
            "La calibration consiste à déterminer les seuils adaptés pour la luminosité, le mouvement et éventuellement la température. Par exemple, il est possible d'ajuster le niveau de luminosité à partir duquel les lumières doivent être activées.",

        commonProblems: [
            {
                problem: "Une LED ne s'allume pas.",
                solution:
                    "Vérifiez son orientation, sa résistance, son câblage et la sortie utilisée dans le programme."
            },
            {
                problem: "Le capteur PIR détecte des mouvements de manière incorrecte.",
                solution:
                    "Vérifiez son alimentation, son emplacement et les paramètres de détection utilisés."
            },
            {
                problem: "La luminosité est mal détectée.",
                solution:
                    "Vérifiez le branchement du capteur et ajustez le seuil utilisé dans le programme."
            },
            {
                problem: "Le relais ne réagit pas.",
                solution:
                    "Vérifiez son alimentation, le signal de commande et la sortie utilisée par l'ESP32."
            },
            {
                problem: "L'ESP32 redémarre régulièrement.",
                solution:
                    "Vérifiez l'alimentation, les connexions et les éventuels courts-circuits sur la maquette."
            },
            {
                problem: "La connexion Wi-Fi ne fonctionne pas.",
                solution:
                    "Vérifiez le nom du réseau, le mot de passe et la configuration Wi-Fi du programme."
            }
        ],

        safety:
            "Pour ce projet pédagogique, utilisez de préférence des LED et des équipements basse tension. Ne connectez pas directement le secteur électrique domestique à une maquette ou à un relais sans matériel approprié, isolation adaptée et supervision d'un adulte qualifié. Coupez toujours l'alimentation avant de modifier le câblage.",

        improvements: [
            "Ajouter un écran pour afficher la température et la luminosité.",
            "Ajouter plusieurs zones d'éclairage.",
            "Ajouter un capteur d'humidité.",
            "Ajouter une interface Web accessible via Wi-Fi.",
            "Ajouter une commande depuis un smartphone.",
            "Créer différents modes : automatique, manuel et nuit.",
            "Ajouter un système de notification.",
            "Enregistrer les mesures des capteurs.",
            "Créer un tableau de bord IoT pour surveiller la maison."
        ],

        educational:
            "Ce projet permet d'étudier l'Internet des objets (IoT), les microcontrôleurs ESP32, les capteurs, les sorties numériques, les relais, la communication Wi-Fi et l'automatisation. Il montre comment plusieurs composants électroniques peuvent être réunis pour créer un système intelligent capable de prendre des décisions automatiquement.",

        conclusion:
            "La Smart Home constitue un excellent projet d'initiation à l'IoT et à la domotique. Grâce à l'ESP32, les capteurs et les systèmes de commande peuvent travailler ensemble pour créer une maison miniature capable de surveiller son environnement et d'automatiser différentes fonctions."
    },

    ar: {
        title: "المنزل الذكي",

        description:
            "قم بإنجاز منزل ذكي صغير قادر على مراقبة محيطه والتحكم تلقائيًا في الأضواء وبعض التجهيزات باستعمال ESP32 والحساسات ووحدات التحكم.",

        tags: [
            "ESP32",
            "Smart Home",
            "IoT",
            "Wi-Fi",
            "Relais",
            "حساسات",
            "الأتمتة"
        ],

        material: [
            "ESP32",
            "وحدة Relay مناسبة",
            "LED",
            "مقاومات LED",
            "حساس ضوء",
            "حساس درجة الحرارة",
            "حساس حركة PIR",
            "أسلاك Dupont",
            "لوحة تجارب",
            "مجسم منزل صغير",
            "مصدر طاقة مناسب",
            "مفتاح تشغيل"
        ],

        componentsDetails: [
            {
                name: "ESP32",
                explanation:
                    "تعتبر ESP32 العقل الرئيسي للمنزل الذكي. فهي تستقبل معلومات الحساسات وتعالجها ثم تتحكم في مختلف التجهيزات. كما تحتوي على Wi-Fi مما يسمح بإضافة وظائف التحكم والمراقبة عن بعد."
            },
            {
                name: "حساس الضوء",
                explanation:
                    "يسمح حساس الضوء بمعرفة ما إذا كانت البيئة مضيئة أو مظلمة. ويمكن للنظام استعمال هذه المعلومات لتشغيل الأضواء تلقائيًا."
            },
            {
                name: "حساس PIR",
                explanation:
                    "يستطيع حساس PIR اكتشاف حركة الأشخاص. ويمكن استعماله لتشغيل الضوء تلقائيًا عند اكتشاف حركة داخل إحدى الغرف."
            },
            {
                name: "حساس درجة الحرارة",
                explanation:
                    "يسمح حساس درجة الحرارة بمراقبة درجة الحرارة داخل المنزل، ويمكن استعماله لتنفيذ إجراءات معينة حسب البرنامج."
            },
            {
                name: "وحدة Relay",
                explanation:
                    "تسمح وحدة Relay لـ ESP32 بالتحكم في بعض التجهيزات المتوافقة مع النظام. في المشروع التعليمي يفضل استعمال LED والأحمال ذات الجهد المنخفض والمناسبة للتجارب."
            },
            {
                name: "LED",
                explanation:
                    "تمثل مصابيح LED نظام الإضاءة في المنزل وتسمح بمشاهدة الأوامر التي ترسلها ESP32 بسهولة."
            },
            {
                name: "Wi-Fi",
                explanation:
                    "تسمح Wi-Fi الموجودة في ESP32 بإضافة وظائف IoT مثل عرض معلومات الحساسات أو التحكم في المجسم من خلال واجهة مناسبة."
            }
        ],

        principle:
            "يعتمد المنزل الذكي على مبدأ الأتمتة. تقوم الحساسات بمراقبة البيئة وإرسال المعلومات إلى ESP32. تقوم ESP32 بتحليل هذه المعلومات واتخاذ قرار حسب الشروط الموجودة في البرنامج. على سبيل المثال، إذا كانت الإضاءة ضعيفة وتم اكتشاف حركة، يمكن للنظام تشغيل LED تلقائيًا.",

        mechanicalAssembly:
            "ابدأ بتحضير مجسم صغير يمثل غرف المنزل المختلفة. ضع LED في الأماكن التي تمثل المصابيح. ثبت حساس الضوء في مكان يمكنه استقبال الضوء، وضع حساس PIR عند مدخل المنزل أو داخل إحدى الغرف، كما يمكن وضع حساس درجة الحرارة في مكان مركزي داخل المجسم.",

        electricalAssembly:
            "يتم توصيل الحساسات بمداخل ESP32، بينما يتم توصيل LED ووحدات التحكم بالمخارج. في المشروع التعليمي يفضل استعمال LED وتجهيزات منخفضة الجهد. يجب فحص جميع التوصيلات قبل تشغيل النظام لتجنب أخطاء التوصيل.",

        wiring:
            "ترسل الحساسات معلوماتها إلى ESP32، التي تقوم بمعالجة البيانات ثم تتحكم في LED أو وحدات Relay حسب الشروط المحددة في البرنامج.",

        wiringDetails: [
            "تثبيت ESP32 على لوحة تجارب أو حامل ثابت.",
            "توصيل حساس الضوء بمدخل مناسب في ESP32.",
            "توصيل حساس PIR بمدخل رقمي.",
            "توصيل حساس درجة الحرارة مع ESP32 حسب نوع الحساس.",
            "توصيل LED بمخارج ESP32 مع استعمال المقاومات المناسبة.",
            "توصيل وحدة Relay بمنفذ تحكم في ESP32.",
            "التأكد من توصيلات الطاقة والأرضي.",
            "تنظيم الأسلاك لتجنب حدوث تماس أو توصيلات غير صحيحة.",
            "برمجة ESP32 حسب الوظائف المطلوبة.",
            "اختبار كل حساس وكل مخرج بشكل منفصل قبل تشغيل النظام الآلي الكامل."
        ],

        algorithm:
            "يبدأ البرنامج بتهيئة ESP32 والحساسات المختلفة. ثم يقوم بقراءة معلومات الضوء والحركة ودرجة الحرارة بشكل مستمر. بناءً على القيم التي يحصل عليها، يقرر تشغيل أو إطفاء الأضواء والتحكم في التجهيزات. ويمكن أيضًا إضافة جزء خاص بالاتصال بشبكة Wi-Fi.",

        programming:
            "يمكن برمجة ESP32 باستعمال Arduino IDE والمكتبات المناسبة. يستعمل البرنامج المداخل لقراءة الحساسات والمخارج للتحكم في LED ووحدات التحكم. ويمكن استعمال الشروط if/else لإنشاء نظام الأتمتة.",

        steps: [
            "تحضير مجسم المنزل.",
            "تحديد الغرف ووظيفة كل غرفة.",
            "تركيب ESP32.",
            "تركيب LED التي تمثل الإضاءة.",
            "تركيب حساس الضوء.",
            "تركيب حساس الحركة PIR.",
            "تركيب حساس درجة الحرارة.",
            "توصيل الحساسات مع ESP32.",
            "توصيل LED مع المقاومات المناسبة.",
            "تركيب وحدة Relay للجزء منخفض الجهد من المشروع.",
            "فحص جميع التوصيلات.",
            "برمجة المداخل والمخارج.",
            "رفع البرنامج إلى ESP32.",
            "اختبار حساس الضوء.",
            "اختبار حساس الحركة.",
            "اختبار حساس درجة الحرارة.",
            "اختبار كل LED بشكل منفصل.",
            "إنشاء شروط التشغيل التلقائي.",
            "إنشاء شروط الإطفاء التلقائي.",
            "اختبار النظام عند اكتشاف الحركة.",
            "اختبار النظام في ظروف إضاءة مختلفة.",
            "مراقبة استجابة النظام لتغير درجة الحرارة.",
            "إعداد اتصال Wi-Fi إذا تم استعماله.",
            "اختبار النظام الآلي بالكامل.",
            "تطوير البرنامج وتحسين تنظيم المجسم."
        ],

        testing:
            "يجب إجراء الاختبارات تدريجيًا. ابدأ باختبار كل حساس بشكل منفصل، ثم اختبر كل LED وكل مخرج. بعد ذلك قم بتفعيل الأتمتة وتأكد من أن الأوامر التي ينفذها النظام تتوافق مع المعلومات التي تكتشفها الحساسات.",

        calibration:
            "تتم المعايرة من خلال تحديد القيم المناسبة للضوء والحركة ودرجة الحرارة. على سبيل المثال، يمكن ضبط مستوى الإضاءة الذي عنده يجب على النظام تشغيل الأضواء تلقائيًا.",

        commonProblems: [
            {
                problem: "مصباح LED لا يضيء.",
                solution:
                    "تحقق من اتجاه LED والمقاومة والتوصيلات والمنفذ المستخدم في البرنامج."
            },
            {
                problem: "حساس PIR يكتشف الحركة بطريقة غير صحيحة.",
                solution:
                    "تحقق من التغذية ومكان تثبيت الحساس وإعدادات الكشف المستعملة."
            },
            {
                problem: "قراءة الضوء غير صحيحة.",
                solution:
                    "تحقق من توصيل الحساس وقم بتعديل قيمة العتبة المستخدمة في البرنامج."
            },
            {
                problem: "وحدة Relay لا تستجيب.",
                solution:
                    "تحقق من التغذية وإشارة التحكم والمنفذ الذي تستعمله ESP32."
            },
            {
                problem: "ESP32 يعيد التشغيل باستمرار.",
                solution:
                    "تحقق من مصدر الطاقة والتوصيلات واحتمال وجود تماس كهربائي في الدارة."
            },
            {
                problem: "الاتصال بشبكة Wi-Fi لا يعمل.",
                solution:
                    "تحقق من اسم الشبكة وكلمة المرور وإعدادات Wi-Fi الموجودة في البرنامج."
            }
        ],

        safety:
            "في هذا المشروع التعليمي يفضل استعمال LED وتجهيزات منخفضة الجهد. لا تقم بتوصيل كهرباء المنزل مباشرة بالمجسم أو بالـ Relay دون معدات مناسبة وعزل كهربائي صحيح وتحت إشراف شخص بالغ مؤهل. افصل دائمًا مصدر الطاقة قبل تعديل أي توصيل كهربائي.",

        improvements: [
            "إضافة شاشة لعرض درجة الحرارة والإضاءة.",
            "إضافة عدة مناطق للإضاءة.",
            "إضافة حساس للرطوبة.",
            "إنشاء واجهة Web يمكن الوصول إليها عبر Wi-Fi.",
            "إضافة التحكم من الهاتف.",
            "إنشاء أوضاع مختلفة: تلقائي، يدوي، وليلي.",
            "إضافة نظام للإشعارات.",
            "تسجيل بيانات الحساسات.",
            "إنشاء لوحة تحكم IoT لمراقبة المنزل."
        ],

        educational:
            "يسمح هذا المشروع بدراسة Internet of Things، وESP32، والحساسات، والمخارج الرقمية، ووحدات Relay، والاتصال عبر Wi-Fi والأتمتة. كما يوضح كيفية جمع عدة مكونات إلكترونية لإنشاء نظام ذكي قادر على مراقبة البيئة واتخاذ قرارات تلقائية.",

        conclusion:
            "يعتبر مشروع المنزل الذكي من أفضل المشاريع للتعرف على IoT والـ Domotique. باستعمال ESP32 والحساسات وأنظمة التحكم يمكن إنشاء منزل مصغر قادر على مراقبة محيطه وأتمتة العديد من الوظائف."
    }
},

  {
    id: 7,

    icon: "🦿",

    fr: {
        title: "Robot Manipulateur",

        description:
            "Concevez un système robotisé capable de saisir, déplacer et déposer de petits objets grâce à plusieurs servomoteurs, une structure articulée et une pince robotique contrôlée par Arduino.",

        tags: [
            "Arduino",
            "Servomoteurs",
            "PWM",
            "Pince robotique",
            "Robotique",
            "Manipulation"
        ],

        material: [
            "Arduino Uno",
            "3 à 5 servomoteurs",
            "Pince robotique",
            "Structure mécanique articulée",
            "Base du robot",
            "Bras et articulations",
            "Fils Dupont",
            "Plaque d'essai",
            "Alimentation adaptée aux servomoteurs",
            "Vis et éléments de fixation",
            "Petits objets légers pour les tests"
        ],

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "Arduino constitue l'unité de commande du robot. Il reçoit les instructions du programme et génère les signaux nécessaires pour contrôler les différents servomoteurs."
            },
            {
                name: "Servomoteurs",
                explanation:
                    "Les servomoteurs permettent de déplacer les différentes articulations du manipulateur. Chaque servo peut contrôler une partie du bras comme la base, l'épaule, le coude ou la pince."
            },
            {
                name: "Pince robotique",
                explanation:
                    "La pince permet de saisir et de maintenir un petit objet. Son ouverture et sa fermeture sont contrôlées par un servomoteur."
            },
            {
                name: "Structure mécanique",
                explanation:
                    "La structure constitue le squelette du robot. Elle relie les différents servomoteurs et permet de transmettre leurs mouvements aux articulations."
            },
            {
                name: "PWM",
                explanation:
                    "Le signal PWM permet à Arduino de commander la position des servomoteurs. En modifiant le signal envoyé, il est possible de définir l'angle souhaité du servo."
            },
            {
                name: "Alimentation",
                explanation:
                    "Les servomoteurs peuvent demander davantage de courant que la carte Arduino ne peut fournir directement. Une alimentation adaptée doit donc être utilisée pour les servomoteurs avec une masse commune au système de commande."
            }
        ],

        principle:
            "Le robot manipulateur fonctionne grâce à plusieurs articulations commandées par des servomoteurs. Arduino envoie des signaux de commande aux servos afin de positionner le bras. Une séquence peut être programmée pour déplacer la pince vers un objet, la fermer, déplacer le bras vers une autre position puis ouvrir la pince afin de déposer l'objet.",

        mechanicalAssembly:
            "Commencez par construire la base du manipulateur. Fixez ensuite les servomoteurs sur les différentes articulations. Assemblez progressivement les parties du bras en vérifiant que chaque articulation peut effectuer son mouvement sans blocage. Installez finalement la pince à l'extrémité du bras.",

        electricalAssembly:
            "Chaque servomoteur possède généralement trois connexions : alimentation, masse et signal de commande. Les fils de signal sont reliés aux sorties de commande d'Arduino. Les servomoteurs doivent disposer d'une alimentation adaptée et la masse doit être commune avec Arduino afin que les signaux de commande soient correctement référencés.",

        wiring:
            "Les servomoteurs sont commandés par Arduino grâce aux signaux PWM. Chaque servo reçoit un signal de commande correspondant à la position souhaitée.",

        wiringDetails: [
            "Installer Arduino sur une plaque d'essai ou un support stable.",
            "Identifier les trois fils de chaque servomoteur : alimentation, masse et signal.",
            "Connecter les fils de signal des servomoteurs aux sorties de commande choisies.",
            "Connecter les alimentations des servomoteurs à une source adaptée.",
            "Relier les masses de l'alimentation des servos et d'Arduino.",
            "Connecter le servomoteur de la base.",
            "Connecter les servomoteurs des articulations du bras.",
            "Connecter le servomoteur de la pince.",
            "Vérifier que les câbles ne gênent pas les mouvements mécaniques.",
            "Tester chaque servomoteur séparément avant de lancer la séquence complète."
        ],

        algorithm:
            "Le programme commence par placer chaque servomoteur dans une position initiale. Il déplace ensuite progressivement les articulations vers les positions nécessaires pour atteindre l'objet. Une fois la pince positionnée, le servo de la pince la ferme. Le bras se déplace ensuite vers la position de destination et la pince s'ouvre pour déposer l'objet.",

        programming:
            "La programmation peut être réalisée avec la bibliothèque Servo d'Arduino. Chaque servomoteur est associé à une variable ou un objet permettant de contrôler sa position. Des fonctions peuvent être créées pour réaliser différentes actions comme position initiale, saisir l'objet, déplacer l'objet et relâcher l'objet.",

        steps: [
            "Préparer la structure mécanique du manipulateur.",
            "Construire la base du robot.",
            "Installer le premier servomoteur.",
            "Installer les articulations du bras.",
            "Fixer les servomoteurs sur les différentes articulations.",
            "Assembler les différentes parties du bras.",
            "Installer la pince robotique.",
            "Fixer le servomoteur de la pince.",
            "Vérifier manuellement les mouvements mécaniques.",
            "Installer Arduino.",
            "Connecter les servomoteurs.",
            "Vérifier l'alimentation des servomoteurs.",
            "Vérifier la masse commune.",
            "Téléverser un programme de test.",
            "Tester chaque servo séparément.",
            "Déterminer les positions initiales.",
            "Déterminer la position nécessaire pour atteindre l'objet.",
            "Programmer l'ouverture de la pince.",
            "Programmer le déplacement vers l'objet.",
            "Programmer la fermeture de la pince.",
            "Programmer le déplacement vers la zone de destination.",
            "Programmer l'ouverture de la pince.",
            "Tester la séquence complète avec un objet léger.",
            "Ajuster les angles et les vitesses de déplacement.",
            "Répéter les tests jusqu'à obtenir un mouvement stable et précis."
        ],

        testing:
            "Commencez toujours par tester les servomoteurs séparément. Vérifiez ensuite chaque articulation sans charge. Après validation des mouvements, utilisez un objet léger pour tester la pince et la séquence complète de manipulation.",

        calibration:
            "La calibration consiste à déterminer les angles correspondant aux positions importantes du robot : position initiale, position de prise, position de transport et position de dépôt. Il faut également vérifier les limites mécaniques de chaque articulation afin d'éviter de forcer les servomoteurs.",

        commonProblems: [
            {
                problem: "Un servomoteur ne bouge pas.",
                solution:
                    "Vérifiez son alimentation, son câble de signal, sa masse et la sortie utilisée dans le programme."
            },
            {
                problem: "Le servo tremble pendant son déplacement.",
                solution:
                    "Vérifiez l'alimentation, les connexions et la charge mécanique. Une alimentation insuffisante peut provoquer un comportement instable."
            },
            {
                problem: "La pince ne saisit pas correctement l'objet.",
                solution:
                    "Ajustez la position de la pince et les angles d'ouverture et de fermeture du servomoteur."
            },
            {
                problem: "Le bras dépasse sa position prévue.",
                solution:
                    "Réduisez les angles programmés et définissez des limites de mouvement pour chaque articulation."
            },
            {
                problem: "Le robot perd sa position.",
                solution:
                    "Vérifiez la stabilité mécanique, la fixation des servomoteurs et l'alimentation."
            },
            {
                problem: "Arduino redémarre lorsque plusieurs servos fonctionnent.",
                solution:
                    "Vérifiez que les servomoteurs disposent d'une alimentation adaptée et évitez de les alimenter directement depuis une sortie insuffisante de la carte."
            }
        ],

        safety:
            "Gardez les doigts éloignés des articulations et de la pince pendant les mouvements. Testez d'abord le robot sans objet puis avec des objets légers. Ne forcez jamais mécaniquement une articulation et coupez l'alimentation avant de modifier le câblage.",

        improvements: [
            "Ajouter des potentiomètres pour commander manuellement les articulations.",
            "Ajouter un joystick pour piloter le bras.",
            "Ajouter des capteurs de position.",
            "Ajouter un écran pour afficher l'état du robot.",
            "Créer plusieurs séquences automatiques.",
            "Ajouter une commande Bluetooth ou Wi-Fi.",
            "Utiliser des capteurs pour détecter la présence d'un objet.",
            "Ajouter une caméra pour des fonctions de vision artificielle.",
            "Améliorer la précision des mouvements grâce à des positions mémorisées."
        ],

        educational:
            "Ce projet permet d'étudier la robotique, les servomoteurs, les signaux PWM, les articulations mécaniques et la programmation séquentielle. Il introduit également les notions de positionnement, de trajectoire et de manipulation d'objets.",

        conclusion:
            "Le robot manipulateur est un projet très intéressant pour comprendre comment un système robotisé peut effectuer une tâche mécanique à partir d'instructions programmées. Il combine mécanique, électronique et programmation dans un seul système."
    },

    ar: {
        title: "الروبوت المناول",

        description:
            "قم بإنجاز نظام روبوتي قادر على التقاط وتحريك ووضع أجسام صغيرة باستعمال عدة محركات Servo وهيكل ميكانيكي متحرك وملقط روبوتي يتم التحكم فيه بواسطة Arduino.",

        tags: [
            "Arduino",
            "Servomoteurs",
            "PWM",
            "ملقط روبوتي",
            "روبوتات",
            "مناولة الأجسام"
        ],

        material: [
            "Arduino Uno",
            "من 3 إلى 5 محركات Servo",
            "ملقط روبوتي",
            "هيكل ميكانيكي متحرك",
            "قاعدة الروبوت",
            "ذراع ومفاصل",
            "أسلاك Dupont",
            "لوحة تجارب",
            "مصدر طاقة مناسب لمحركات Servo",
            "براغي وعناصر تثبيت",
            "أجسام صغيرة وخفيفة للاختبار"
        ],

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "تمثل Arduino وحدة التحكم الرئيسية في الروبوت. تستقبل التعليمات الموجودة في البرنامج وترسل إشارات التحكم اللازمة إلى محركات Servo."
            },
            {
                name: "محركات Servo",
                explanation:
                    "تسمح محركات Servo بتحريك المفاصل المختلفة للذراع. ويمكن لكل محرك التحكم في جزء معين مثل القاعدة أو الكتف أو المرفق أو الملقط."
            },
            {
                name: "الملقط الروبوتي",
                explanation:
                    "يسمح الملقط بالتقاط جسم صغير والإمساك به. ويتم التحكم في فتحه وإغلاقه بواسطة محرك Servo."
            },
            {
                name: "الهيكل الميكانيكي",
                explanation:
                    "يمثل الهيكل العمود الأساسي للروبوت، حيث يربط بين المحركات والمفاصل ويسمح بتحويل حركات المحركات إلى حركة ميكانيكية للذراع."
            },
            {
                name: "PWM",
                explanation:
                    "تستعمل إشارة PWM للتحكم في وضعية محركات Servo. ومن خلال تغيير الإشارة يمكن تحديد الزاوية المطلوبة للمحرك."
            },
            {
                name: "مصدر الطاقة",
                explanation:
                    "قد تحتاج محركات Servo إلى تيار أكبر من قدرة Arduino على توفيره مباشرة، لذلك يجب استعمال مصدر طاقة مناسب للمحركات مع توحيد الأرضي بين مصدر الطاقة وArduino."
            }
        ],

        principle:
            "يعمل الروبوت المناول باستعمال عدة مفاصل يتم تحريكها بواسطة محركات Servo. ترسل Arduino إشارات تحكم إلى المحركات لتحديد وضعية الذراع. يمكن برمجة تسلسل معين يجعل الملقط يتحرك نحو الجسم، ثم يغلق لالتقاطه، وبعد ذلك يحرك الذراع إلى مكان آخر ويفتح الملقط لوضع الجسم.",

        mechanicalAssembly:
            "ابدأ ببناء قاعدة الروبوت، ثم قم بتثبيت محركات Servo على المفاصل المختلفة. ركّب أجزاء الذراع تدريجيًا وتأكد من أن كل مفصل يستطيع التحرك بحرية دون عوائق. في النهاية قم بتركيب الملقط في نهاية الذراع.",

        electricalAssembly:
            "يحتوي محرك Servo عادةً على ثلاثة أسلاك: التغذية والأرضي وإشارة التحكم. يتم ربط أسلاك الإشارة بمخارج التحكم في Arduino. يجب استعمال مصدر طاقة مناسب للمحركات وربط الأرضي مع Arduino حتى تكون إشارات التحكم صحيحة.",

        wiring:
            "يتم التحكم في محركات Servo بواسطة Arduino من خلال إشارات PWM، حيث يحصل كل محرك على إشارة تحدد الوضعية المطلوبة.",

        wiringDetails: [
            "تثبيت Arduino على لوحة تجارب أو حامل ثابت.",
            "تحديد الأسلاك الثلاثة لكل محرك Servo: التغذية والأرضي والإشارة.",
            "توصيل أسلاك الإشارة بالمخارج المناسبة في Arduino.",
            "توصيل المحركات بمصدر طاقة مناسب.",
            "ربط أرضي مصدر طاقة المحركات مع أرضي Arduino.",
            "توصيل محرك Servo الخاص بالقاعدة.",
            "توصيل محركات المفاصل المختلفة.",
            "توصيل محرك Servo الخاص بالملقط.",
            "التأكد من أن الأسلاك لا تعيق حركة المفاصل.",
            "اختبار كل محرك بشكل منفصل قبل تشغيل التسلسل الكامل."
        ],

        algorithm:
            "يبدأ البرنامج بوضع جميع المحركات في وضعية ابتدائية. بعد ذلك يقوم بتحريك المفاصل تدريجيًا نحو الوضعيات اللازمة للوصول إلى الجسم. عندما يصل الملقط إلى المكان المناسب، يقوم المحرك بإغلاقه للإمساك بالجسم. بعد ذلك تتحرك الذراع نحو مكان الوجهة ثم يفتح الملقط لوضع الجسم.",

        programming:
            "يمكن برمجة المشروع باستعمال مكتبة Servo في Arduino. يتم ربط كل محرك بمتغير أو كائن يسمح بالتحكم في وضعه. ويمكن إنشاء دوال لتنفيذ عمليات مختلفة مثل الوضعية الابتدائية، التقاط الجسم، نقله، ثم تركه.",

        steps: [
            "تحضير الهيكل الميكانيكي للروبوت.",
            "بناء قاعدة الروبوت.",
            "تركيب أول محرك Servo.",
            "تركيب مفاصل الذراع.",
            "تثبيت محركات Servo على المفاصل.",
            "تجميع أجزاء الذراع.",
            "تركيب الملقط الروبوتي.",
            "تثبيت محرك Servo الخاص بالملقط.",
            "فحص الحركة الميكانيكية يدويًا.",
            "تركيب Arduino.",
            "توصيل محركات Servo.",
            "التأكد من مصدر طاقة المحركات.",
            "التأكد من توحيد الأرضي.",
            "رفع برنامج الاختبار.",
            "اختبار كل محرك بشكل منفصل.",
            "تحديد الوضعية الابتدائية.",
            "تحديد الوضعية اللازمة للوصول إلى الجسم.",
            "برمجة فتح الملقط.",
            "برمجة حركة الذراع نحو الجسم.",
            "برمجة إغلاق الملقط.",
            "برمجة حركة الذراع نحو مكان الوجهة.",
            "برمجة فتح الملقط.",
            "اختبار التسلسل الكامل باستعمال جسم خفيف.",
            "تعديل الزوايا وسرعة الحركة.",
            "تكرار الاختبارات حتى تصبح حركة الروبوت مستقرة ودقيقة."
        ],

        testing:
            "ابدأ دائمًا باختبار محركات Servo بشكل منفصل. بعد ذلك اختبر كل مفصل دون حمل. وبعد التأكد من صحة الحركات، استعمل جسمًا خفيفًا لاختبار الملقط وتسلسل المناولة الكامل.",

        calibration:
            "تتم المعايرة من خلال تحديد الزوايا الخاصة بالوضعيات المهمة للروبوت: الوضعية الابتدائية، وضعية التقاط الجسم، وضعية النقل، ووضعية ترك الجسم. يجب أيضًا تحديد حدود الحركة لكل مفصل حتى لا يتم إجبار المحركات على تجاوز حدودها الميكانيكية.",

        commonProblems: [
            {
                problem: "أحد محركات Servo لا يتحرك.",
                solution:
                    "تحقق من التغذية وسلك الإشارة والأرضي والمنفذ المستخدم في البرنامج."
            },
            {
                problem: "محرك Servo يهتز أثناء الحركة.",
                solution:
                    "تحقق من مصدر الطاقة والتوصيلات والحمل الميكانيكي، لأن ضعف التغذية قد يؤدي إلى حركة غير مستقرة."
            },
            {
                problem: "الملقط لا يمسك الجسم بشكل صحيح.",
                solution:
                    "قم بتعديل وضعية الملقط وزوايا الفتح والإغلاق الخاصة بالمحرك."
            },
            {
                problem: "الذراع تتجاوز الوضعية المطلوبة.",
                solution:
                    "قم بتقليل الزوايا المبرمجة وحدد حدودًا للحركة لكل مفصل."
            },
            {
                problem: "الروبوت يفقد وضعيته.",
                solution:
                    "تحقق من ثبات الهيكل وتثبيت المحركات ومصدر الطاقة."
            },
            {
                problem: "Arduino يعيد التشغيل عند تشغيل عدة محركات.",
                solution:
                    "تحقق من أن محركات Servo تحصل على مصدر طاقة مناسب وتجنب تشغيل عدة محركات من مصدر غير قادر على توفير التيار المطلوب."
            }
        ],

        safety:
            "أبعد أصابعك عن المفاصل والملقط أثناء حركة الروبوت. اختبر النظام أولًا دون جسم ثم باستعمال أجسام خفيفة. لا تجبر أي مفصل ميكانيكيًا، وافصل مصدر الطاقة قبل تعديل التوصيلات.",

        improvements: [
            "إضافة Potentiomètres للتحكم اليدوي في المفاصل.",
            "إضافة Joystick للتحكم في الذراع.",
            "إضافة حساسات لوضعية المفاصل.",
            "إضافة شاشة لعرض حالة الروبوت.",
            "إنشاء عدة تسلسلات للحركة التلقائية.",
            "إضافة التحكم عبر Bluetooth أو Wi-Fi.",
            "إضافة حساسات لاكتشاف وجود جسم.",
            "إضافة كاميرا لاستعمال تقنيات الرؤية الحاسوبية.",
            "تحسين دقة الحركة باستعمال وضعيات محفوظة مسبقًا."
        ],

        educational:
            "يسمح هذا المشروع بدراسة الروبوتات، ومحركات Servo، وإشارات PWM، والمفاصل الميكانيكية، والبرمجة التسلسلية. كما يقدم مفاهيم تحديد الوضعية والمسار وتحريك الأجسام.",

        conclusion:
            "يعتبر الروبوت المناول مشروعًا ممتازًا لفهم كيفية تنفيذ نظام روبوتي لمهمة ميكانيكية اعتمادًا على تعليمات مبرمجة. فهو يجمع بين الميكانيك والإلكترونيات والبرمجة في نظام واحد."
    }
},
   {
    id: 8,
    icon: "🌡️",

    fr: {
        title: "Station Météo",
        description:
            "Concevez une station météo intelligente capable de mesurer la température, l'humidité et différents paramètres environnementaux à l'aide d'un ESP32 et de plusieurs capteurs.",

        tags: [
            "ESP32",
            "DHT22",
            "Capteurs",
            "LCD",
            "IoT",
            "Station météo"
        ],

        material: [
            "ESP32",
            "Capteur DHT22",
            "Écran LCD I2C",
            "Capteur de luminosité",
            "Capteur de pression atmosphérique",
            "Plaque d'essai",
            "Fils Dupont",
            "Câble USB",
            "Résistances adaptées si nécessaire",
            "Boîtier pour protéger les composants"
        ],

        componentsDetails: [
            {
                name: "ESP32",
                explanation:
                    "L'ESP32 est le microcontrôleur principal de la station. Il lit les données provenant des capteurs, les traite et les transmet à l'écran. Grâce au Wi-Fi intégré, il peut également envoyer les données vers une application ou un serveur."
            },
            {
                name: "DHT22",
                explanation:
                    "Le DHT22 mesure la température et l'humidité relative de l'air. Il fournit les données à l'ESP32 afin qu'elles puissent être affichées ou enregistrées."
            },
            {
                name: "Écran LCD I2C",
                explanation:
                    "L'écran LCD permet d'afficher les valeurs mesurées par les différents capteurs. L'interface I2C réduit le nombre de fils nécessaires entre l'écran et l'ESP32."
            },
            {
                name: "Capteur de luminosité",
                explanation:
                    "Un capteur de luminosité permet de mesurer l'intensité lumineuse de l'environnement. Cette information peut être affichée avec les autres mesures."
            },
            {
                name: "Capteur de pression",
                explanation:
                    "Un capteur de pression atmosphérique permet de mesurer la pression de l'air. Cette donnée peut être utilisée pour compléter les informations météorologiques."
            },
            {
                name: "Wi-Fi ESP32",
                explanation:
                    "La connexion Wi-Fi intégrée à l'ESP32 permet d'envoyer les mesures vers une interface web, une application ou une plateforme IoT lorsque cette fonction est ajoutée au projet."
            }
        ],

        principle:
            "La station météo fonctionne en récupérant périodiquement les informations fournies par les capteurs. L'ESP32 lit la température et l'humidité du DHT22 ainsi que les autres paramètres disponibles, traite les données puis les affiche sur l'écran LCD. Une version avancée peut également transmettre les mesures par Wi-Fi.",

        mechanicalAssembly:
            "Installez l'ESP32 et les capteurs sur une plaque d'essai ou dans un support adapté. Le DHT22 doit être placé dans un endroit permettant à l'air de circuler correctement autour du capteur. L'écran LCD doit être placé de manière à être facilement lisible. Si un boîtier est utilisé, il doit permettre une bonne circulation de l'air autour des capteurs environnementaux.",

        electricalAssembly:
            "Connectez le DHT22 à l'ESP32 en respectant les connexions d'alimentation, de masse et de données. Connectez ensuite l'écran LCD I2C aux lignes de communication de l'ESP32. Les autres capteurs sont raccordés selon leur type d'interface et leurs besoins électriques. Vérifiez la tension de fonctionnement de chaque module avant de réaliser les connexions.",

        wiring:
            "Le DHT22 transmet les valeurs de température et d'humidité à l'ESP32. L'écran LCD communique avec l'ESP32 via le protocole I2C. Les autres capteurs peuvent utiliser des entrées analogiques, numériques ou des interfaces comme I2C selon leur modèle.",

        wiringDetails: [
            "Installer l'ESP32 sur une plaque d'essai.",
            "Identifier les broches d'alimentation et de données du DHT22.",
            "Connecter le DHT22 à l'ESP32.",
            "Connecter l'écran LCD I2C aux lignes SDA et SCL appropriées de l'ESP32.",
            "Connecter le capteur de luminosité si celui-ci est utilisé.",
            "Connecter le capteur de pression atmosphérique si celui-ci est utilisé.",
            "Vérifier les connexions d'alimentation et de masse.",
            "Vérifier que chaque capteur reçoit une tension compatible.",
            "Connecter l'ESP32 à l'ordinateur avec un câble USB.",
            "Tester chaque capteur séparément avant de lancer la station complète."
        ],

        algorithm:
            "Au démarrage, l'ESP32 initialise les capteurs et l'écran LCD. Le programme lit ensuite régulièrement les valeurs de température, d'humidité et des autres capteurs. Les données sont vérifiées puis affichées sur l'écran. Le système répète automatiquement cette opération après un court intervalle.",

        programming:
            "La programmation peut être réalisée avec Arduino IDE. Des bibliothèques adaptées au DHT22 et à l'écran LCD I2C peuvent être utilisées. Le programme doit initialiser les composants, lire les capteurs, convertir les données si nécessaire et afficher les résultats. Une extension Wi-Fi peut permettre d'envoyer les mesures vers une interface web.",

        steps: [
            "Préparer l'ESP32 et les différents capteurs.",
            "Installer l'ESP32 sur une plaque d'essai.",
            "Installer le capteur DHT22.",
            "Connecter l'alimentation du DHT22.",
            "Connecter le signal du DHT22 à l'ESP32.",
            "Installer l'écran LCD I2C.",
            "Connecter les lignes SDA et SCL.",
            "Ajouter le capteur de luminosité.",
            "Ajouter le capteur de pression atmosphérique.",
            "Vérifier toutes les connexions.",
            "Connecter l'ESP32 à l'ordinateur.",
            "Installer les bibliothèques nécessaires.",
            "Téléverser un programme de test du DHT22.",
            "Vérifier les valeurs de température.",
            "Vérifier les valeurs d'humidité.",
            "Tester l'écran LCD.",
            "Afficher les mesures sur l'écran.",
            "Tester les autres capteurs.",
            "Ajouter une actualisation automatique des mesures.",
            "Ajouter éventuellement la connexion Wi-Fi.",
            "Créer une interface web pour afficher les données.",
            "Installer les composants dans un boîtier adapté.",
            "Effectuer plusieurs tests dans différentes conditions.",
            "Comparer les mesures avec un appareil de référence.",
            "Finaliser la station météo."
        ],

        testing:
            "Testez chaque capteur séparément avant de faire fonctionner la station complète. Vérifiez que les valeurs restent cohérentes lorsque les conditions environnementales changent. Testez également l'affichage LCD et, si elle est utilisée, la transmission Wi-Fi.",

        calibration:
            "La calibration consiste à comparer les mesures des capteurs avec celles d'un appareil de référence. Si une différence importante est observée, vérifiez d'abord les connexions, l'alimentation, l'emplacement du capteur et les paramètres du programme.",

        commonProblems: [
            {
                problem: "Le DHT22 ne retourne aucune valeur.",
                solution:
                    "Vérifiez son alimentation, son câblage, la broche de données utilisée dans le programme et la bibliothèque installée."
            },
            {
                problem: "Les valeurs de température semblent incorrectes.",
                solution:
                    "Vérifiez l'emplacement du capteur, laissez-le se stabiliser et comparez les mesures avec un appareil de référence."
            },
            {
                problem: "L'écran LCD reste vide.",
                solution:
                    "Vérifiez l'alimentation, les connexions SDA et SCL ainsi que l'adresse I2C utilisée dans le programme."
            },
            {
                problem: "Les mesures sont instables.",
                solution:
                    "Vérifiez l'alimentation, les connexions et l'emplacement des capteurs. Évitez également de placer le DHT22 près d'une source de chaleur."
            },
            {
                problem: "L'ESP32 redémarre régulièrement.",
                solution:
                    "Vérifiez la qualité de l'alimentation USB et assurez-vous que les différents modules ne demandent pas plus de courant que la source ne peut fournir."
            },
            {
                problem: "La connexion Wi-Fi ne fonctionne pas.",
                solution:
                    "Vérifiez le nom du réseau, le mot de passe et le programme Wi-Fi. Assurez-vous également que le réseau utilisé est compatible avec l'ESP32."
            }
        ],

        safety:
            "Utilisez une alimentation adaptée à l'ESP32 et aux capteurs. Évitez tout contact entre les broches d'alimentation et la masse. Ne connectez pas directement des tensions non compatibles avec les entrées de l'ESP32. Débranchez l'alimentation avant de modifier le câblage.",

        improvements: [
            "Ajouter un capteur de pression atmosphérique plus précis.",
            "Ajouter un capteur de qualité de l'air.",
            "Ajouter un capteur de pluie.",
            "Ajouter un anémomètre pour mesurer la vitesse du vent.",
            "Ajouter un écran OLED.",
            "Enregistrer les données dans une base de données.",
            "Créer une interface web accessible depuis un téléphone.",
            "Afficher des graphiques de température et d'humidité.",
            "Ajouter une horloge en temps réel.",
            "Envoyer automatiquement les mesures vers une plateforme IoT.",
            "Créer un système d'alertes lorsque certaines valeurs dépassent un seuil."
        ],

        educational:
            "Ce projet permet d'apprendre à utiliser l'ESP32, les capteurs environnementaux, le protocole I2C, l'affichage LCD et la lecture de données. Il introduit également les notions d'IoT, de transmission Wi-Fi, d'enregistrement des données et de visualisation des mesures.",

        conclusion:
            "La station météo constitue un excellent projet pour découvrir les systèmes connectés. Elle combine électronique, programmation, capteurs et communication sans fil afin de créer un système capable de surveiller l'environnement en temps réel."
    },

    ar: {
        title: "محطة الطقس",

        description:
            "إنجاز محطة طقس ذكية قادرة على قياس درجة الحرارة والرطوبة وعدة معطيات بيئية باستعمال ESP32 ومجموعة من الحساسات.",

        tags: [
            "ESP32",
            "DHT22",
            "حساسات",
            "LCD",
            "إنترنت الأشياء",
            "محطة طقس"
        ],

        material: [
            "ESP32",
            "حساس DHT22",
            "شاشة LCD I2C",
            "حساس شدة الإضاءة",
            "حساس الضغط الجوي",
            "لوحة تجارب",
            "أسلاك Dupont",
            "كابل USB",
            "مقاومات مناسبة عند الحاجة",
            "علبة لحماية المكونات"
        ],

        componentsDetails: [
            {
                name: "ESP32",
                explanation:
                    "يمثل ESP32 وحدة التحكم الرئيسية في محطة الطقس. يقوم بقراءة البيانات القادمة من الحساسات ومعالجتها وإرسالها إلى الشاشة. كما يحتوي على Wi-Fi مدمج يسمح بإرسال البيانات إلى تطبيق أو خادم عند إضافة هذه الوظيفة."
            },
            {
                name: "DHT22",
                explanation:
                    "يقيس حساس DHT22 درجة الحرارة ونسبة الرطوبة في الهواء، ثم يرسل هذه البيانات إلى ESP32 ليتم عرضها أو تخزينها."
            },
            {
                name: "شاشة LCD I2C",
                explanation:
                    "تسمح شاشة LCD بعرض القيم التي يتم قياسها بواسطة الحساسات. وتساعد واجهة I2C على تقليل عدد الأسلاك اللازمة لتوصيل الشاشة مع ESP32."
            },
            {
                name: "حساس شدة الإضاءة",
                explanation:
                    "يسمح حساس الإضاءة بقياس شدة الضوء في البيئة المحيطة، ويمكن عرض هذه القيمة مع باقي القياسات."
            },
            {
                name: "حساس الضغط الجوي",
                explanation:
                    "يسمح حساس الضغط الجوي بقياس ضغط الهواء، ويمكن استعمال هذه المعلومة لإضافة بيانات جوية أخرى إلى محطة الطقس."
            },
            {
                name: "Wi-Fi في ESP32",
                explanation:
                    "تسمح تقنية Wi-Fi المدمجة في ESP32 بإرسال القياسات إلى واجهة ويب أو تطبيق أو منصة IoT عند إضافة هذه الوظيفة إلى المشروع."
            }
        ],

        principle:
            "تعمل محطة الطقس من خلال الحصول بشكل دوري على المعلومات التي توفرها الحساسات. يقوم ESP32 بقراءة درجة الحرارة والرطوبة من DHT22 بالإضافة إلى باقي المعطيات، ثم يعالج البيانات ويعرضها على شاشة LCD. ويمكن في نسخة متقدمة إرسال القياسات عبر Wi-Fi.",

        mechanicalAssembly:
            "قم بتركيب ESP32 والحساسات على لوحة تجارب أو داخل حامل مناسب. يجب وضع DHT22 في مكان يسمح بمرور الهواء حوله بشكل جيد. كما يجب وضع شاشة LCD في مكان يسهل رؤية المعلومات عليه. وإذا تم استعمال علبة، فيجب أن تسمح بمرور الهواء حول الحساسات البيئية.",

        electricalAssembly:
            "قم بتوصيل DHT22 مع ESP32 مع احترام توصيلات التغذية والأرضي والبيانات. بعد ذلك قم بتوصيل شاشة LCD I2C بخطوط الاتصال الخاصة بـ ESP32. يتم توصيل الحساسات الأخرى حسب نوع الواجهة الخاصة بها ومتطلباتها الكهربائية. تحقق دائمًا من جهد التشغيل المناسب لكل وحدة قبل التوصيل.",

        wiring:
            "يرسل حساس DHT22 قيم درجة الحرارة والرطوبة إلى ESP32. وتتصل شاشة LCD مع ESP32 باستعمال بروتوكول I2C. ويمكن للحساسات الأخرى استعمال مداخل Analog أو Digital أو واجهات مثل I2C حسب نوع الحساس.",

        wiringDetails: [
            "وضع ESP32 على لوحة التجارب.",
            "تحديد أسلاك التغذية والبيانات الخاصة بحساس DHT22.",
            "توصيل DHT22 مع ESP32.",
            "توصيل شاشة LCD I2C بخطوط SDA وSCL المناسبة في ESP32.",
            "توصيل حساس شدة الإضاءة إذا كان مستخدمًا.",
            "توصيل حساس الضغط الجوي إذا كان مستخدمًا.",
            "التحقق من توصيلات التغذية والأرضي.",
            "التأكد من أن كل حساس يحصل على جهد مناسب.",
            "توصيل ESP32 بالحاسوب بواسطة كابل USB.",
            "اختبار كل حساس بشكل منفصل قبل تشغيل محطة الطقس كاملة."
        ],

        algorithm:
            "عند تشغيل النظام يقوم ESP32 بتهيئة الحساسات وشاشة LCD. بعد ذلك يقرأ بشكل دوري قيم درجة الحرارة والرطوبة وباقي الحساسات. يتم التحقق من البيانات ثم عرضها على الشاشة. ويكرر النظام هذه العملية تلقائيًا بعد فترة زمنية قصيرة.",

        programming:
            "يمكن برمجة المشروع باستعمال Arduino IDE. ويمكن استعمال مكتبات مناسبة لحساس DHT22 وشاشة LCD I2C. يجب أن يقوم البرنامج بتهيئة المكونات وقراءة الحساسات ومعالجة البيانات وعرض النتائج. ويمكن إضافة Wi-Fi لإرسال القياسات إلى واجهة ويب.",

        steps: [
            "تحضير ESP32 والحساسات المختلفة.",
            "وضع ESP32 على لوحة التجارب.",
            "تركيب حساس DHT22.",
            "توصيل تغذية DHT22.",
            "توصيل سلك البيانات بين DHT22 وESP32.",
            "تركيب شاشة LCD I2C.",
            "توصيل خطوط SDA وSCL.",
            "إضافة حساس شدة الإضاءة.",
            "إضافة حساس الضغط الجوي.",
            "التحقق من جميع التوصيلات.",
            "توصيل ESP32 بالحاسوب.",
            "تثبيت المكتبات اللازمة.",
            "رفع برنامج اختبار DHT22.",
            "التحقق من درجة الحرارة.",
            "التحقق من نسبة الرطوبة.",
            "اختبار شاشة LCD.",
            "عرض القياسات على الشاشة.",
            "اختبار باقي الحساسات.",
            "إضافة تحديث تلقائي للقياسات.",
            "إضافة اتصال Wi-Fi عند الحاجة.",
            "إنشاء واجهة ويب لعرض البيانات.",
            "وضع المكونات داخل علبة مناسبة.",
            "إجراء عدة اختبارات في ظروف مختلفة.",
            "مقارنة القياسات مع جهاز مرجعي.",
            "إكمال محطة الطقس."
        ],

        testing:
            "اختبر كل حساس بشكل منفصل قبل تشغيل محطة الطقس كاملة. تحقق من أن القيم تبقى منطقية عندما تتغير الظروف المحيطة. اختبر أيضًا شاشة LCD، وإذا تم استعمال Wi-Fi فاختبر إرسال البيانات بشكل صحيح.",

        calibration:
            "تتم المعايرة من خلال مقارنة قياسات الحساسات مع جهاز مرجعي. إذا ظهرت فروقات كبيرة، تحقق أولًا من التوصيلات ومصدر الطاقة ومكان وضع الحساس وإعدادات البرنامج.",

        commonProblems: [
            {
                problem: "حساس DHT22 لا يعطي أي قيمة.",
                solution:
                    "تحقق من التغذية والتوصيلات وسلك البيانات والمنفذ المستخدم في البرنامج والمكتبة المثبتة."
            },
            {
                problem: "درجة الحرارة تبدو غير صحيحة.",
                solution:
                    "تحقق من مكان الحساس واتركه يستقر لبعض الوقت ثم قارن القياسات مع جهاز مرجعي."
            },
            {
                problem: "شاشة LCD لا تعرض أي شيء.",
                solution:
                    "تحقق من التغذية وتوصيلات SDA وSCL وكذلك عنوان I2C المستخدم في البرنامج."
            },
            {
                problem: "القياسات غير مستقرة.",
                solution:
                    "تحقق من مصدر الطاقة والتوصيلات ومكان وضع الحساسات، وتجنب وضع DHT22 بالقرب من مصدر حرارة."
            },
            {
                problem: "ESP32 يعيد التشغيل باستمرار.",
                solution:
                    "تحقق من جودة مصدر الطاقة USB وتأكد من أن الوحدات المتصلة لا تحتاج إلى تيار أكبر من قدرة المصدر."
            },
            {
                problem: "اتصال Wi-Fi لا يعمل.",
                solution:
                    "تحقق من اسم الشبكة وكلمة المرور وبرنامج Wi-Fi، وتأكد من أن الشبكة المستخدمة متوافقة مع ESP32."
            }
        ],

        safety:
            "استعمل مصدر طاقة مناسبًا لـ ESP32 والحساسات. تجنب حدوث تماس بين منافذ التغذية والأرضي. لا توصل جهودًا غير متوافقة مباشرة مع مداخل ESP32. افصل الطاقة قبل تعديل التوصيلات.",

        improvements: [
            "إضافة حساس ضغط جوي أكثر دقة.",
            "إضافة حساس لجودة الهواء.",
            "إضافة حساس المطر.",
            "إضافة Anémomètre لقياس سرعة الرياح.",
            "إضافة شاشة OLED.",
            "تخزين البيانات في قاعدة بيانات.",
            "إنشاء واجهة ويب يمكن الوصول إليها من الهاتف.",
            "عرض رسوم بيانية لدرجة الحرارة والرطوبة.",
            "إضافة ساعة حقيقية RTC.",
            "إرسال القياسات تلقائيًا إلى منصة IoT.",
            "إنشاء نظام تنبيهات عندما تتجاوز بعض القيم حدًا معينًا."
        ],

        educational:
            "يسمح هذا المشروع بتعلم استعمال ESP32 والحساسات البيئية وبروتوكول I2C وشاشات LCD وقراءة البيانات. كما يقدم مفاهيم إنترنت الأشياء IoT وإرسال البيانات عبر Wi-Fi وتخزين القياسات وعرضها.",

        conclusion:
            "تعتبر محطة الطقس مشروعًا ممتازًا لاكتشاف الأنظمة المتصلة. فهي تجمع بين الإلكترونيات والبرمجة والحساسات والاتصال اللاسلكي لإنشاء نظام قادر على مراقبة البيئة وعرض بياناتها في الوقت الحقيقي."
    }
},

    {
    id: 9,
    icon: "📷🤖",

    fr: {
        title: "Robot Caméra",

        description:
            "Concevez un robot mobile équipé d'une caméra ESP32-CAM capable de transmettre des images par Wi-Fi, de surveiller son environnement et, dans une version avancée, d'être contrôlé à distance depuis une interface web.",

        tags: [
            "ESP32-CAM",
            "Wi-Fi",
            "Caméra",
            "Robot mobile",
            "IoT",
            "Contrôle à distance"
        ],

        material: [
            "ESP32-CAM",
            "Châssis de robot",
            "2 moteurs DC ou 4 moteurs selon le châssis",
            "Driver moteur compatible",
            "Roues",
            "Batterie adaptée",
            "Convertisseur de tension si nécessaire",
            "Fils Dupont",
            "Interrupteur",
            "Support pour caméra",
            "Câble USB ou programmateur adapté à l'ESP32-CAM"
        ],

        componentsDetails: [
            {
                name: "ESP32-CAM",
                explanation:
                    "L'ESP32-CAM constitue le cerveau du système de vision. Il contrôle la caméra, traite les images et peut transmettre un flux vidéo ou des captures à travers le réseau Wi-Fi."
            },
            {
                name: "Caméra",
                explanation:
                    "La caméra permet au robot de capturer des images de son environnement. Les images peuvent être consultées à distance depuis un appareil connecté au même réseau lorsque le programme le permet."
            },
            {
                name: "Moteurs DC",
                explanation:
                    "Les moteurs permettent au robot de se déplacer vers l'avant, l'arrière ou de tourner. Ils sont commandés par un driver moteur plutôt que directement par les sorties de l'ESP32-CAM."
            },
            {
                name: "Driver moteur",
                explanation:
                    "Le driver moteur permet à l'ESP32-CAM ou à un microcontrôleur associé de contrôler le sens et, selon le modèle, la vitesse des moteurs."
            },
            {
                name: "Batterie",
                explanation:
                    "La batterie fournit l'énergie nécessaire au robot. Une alimentation adaptée doit être utilisée pour éviter les problèmes de tension et de courant."
            },
            {
                name: "Wi-Fi",
                explanation:
                    "La connexion Wi-Fi permet de transmettre les images de la caméra et peut également être utilisée pour recevoir des commandes de contrôle à distance."
            }
        ],

        principle:
            "Le robot utilise une ESP32-CAM pour capturer des images et les transmettre par Wi-Fi. L'ESP32-CAM peut également héberger une petite interface web permettant de consulter la caméra. Dans une version mobile, un système de commande permet de contrôler les moteurs afin de déplacer le robot tout en visualisant son environnement.",

        mechanicalAssembly:
            "Commencez par assembler le châssis et installer les roues et les moteurs. Fixez ensuite solidement l'ESP32-CAM sur le robot avec la caméra orientée vers l'avant. Vérifiez que la caméra offre un champ de vision suffisant et que les câbles ne touchent pas les roues ou les parties mobiles.",

        electricalAssembly:
            "Connectez les moteurs au driver moteur et reliez les entrées de commande du driver au système de contrôle. L'ESP32-CAM doit recevoir une alimentation compatible avec ses caractéristiques. Si plusieurs sources d'alimentation sont utilisées, les masses doivent être correctement référencées selon le montage.",

        wiring:
            "L'ESP32-CAM contrôle la partie caméra et la communication Wi-Fi. Les moteurs sont reliés au driver moteur, qui reçoit les commandes de déplacement. Il ne faut pas connecter directement les moteurs aux broches de l'ESP32-CAM car ils nécessitent davantage de courant.",

        wiringDetails: [
            "Installer l'ESP32-CAM sur un support stable.",
            "Installer les moteurs sur le châssis.",
            "Fixer les roues sur les moteurs.",
            "Connecter les moteurs au driver moteur.",
            "Connecter les entrées de commande du driver au système de contrôle.",
            "Préparer une alimentation adaptée à l'ESP32-CAM.",
            "Préparer une alimentation adaptée aux moteurs.",
            "Relier correctement les masses lorsque le montage l'exige.",
            "Installer un interrupteur général.",
            "Fixer la caméra de manière stable.",
            "Vérifier que les câbles ne gênent pas les roues.",
            "Tester la caméra séparément.",
            "Tester ensuite les moteurs avant d'assembler la commande complète."
        ],

        algorithm:
            "Au démarrage, l'ESP32-CAM initialise la caméra et la connexion Wi-Fi. Le système attend ensuite les demandes de l'utilisateur. Lorsqu'une image ou un flux vidéo est demandé, la caméra capture les données et les transmet à l'interface. Dans une version robot mobile, les commandes reçues permettent également de contrôler les moteurs : avancer, reculer, tourner à gauche ou tourner à droite.",

        programming:
            "La programmation peut être réalisée avec Arduino IDE et les bibliothèques adaptées à l'ESP32-CAM. Le programme configure la caméra, initialise le Wi-Fi et crée éventuellement une interface web. Des boutons peuvent être ajoutés à cette interface pour envoyer des commandes au robot. Le contrôle des moteurs doit être réalisé à travers un driver compatible.",

        steps: [
            "Préparer le châssis du robot.",
            "Installer les moteurs.",
            "Installer les roues.",
            "Fixer le support de l'ESP32-CAM.",
            "Installer l'ESP32-CAM.",
            "Fixer correctement la caméra.",
            "Installer le driver moteur.",
            "Connecter les moteurs au driver.",
            "Préparer l'alimentation.",
            "Vérifier les tensions nécessaires.",
            "Connecter l'ESP32-CAM.",
            "Installer l'environnement de programmation.",
            "Configurer les bibliothèques nécessaires.",
            "Téléverser un programme de test de la caméra.",
            "Configurer la connexion Wi-Fi.",
            "Afficher l'adresse réseau du robot.",
            "Ouvrir l'interface de caméra depuis un appareil autorisé.",
            "Tester la transmission des images.",
            "Tester chaque moteur séparément.",
            "Tester le déplacement vers l'avant.",
            "Tester le déplacement vers l'arrière.",
            "Tester les rotations.",
            "Créer une interface de contrôle si nécessaire.",
            "Tester simultanément la caméra et les mouvements.",
            "Fixer définitivement les câbles et finaliser le robot."
        ],

        testing:
            "Testez d'abord la caméra sans faire fonctionner les moteurs. Vérifiez ensuite chaque moteur séparément. Une fois les deux systèmes validés, testez le déplacement du robot avec la caméra active. Commencez à faible vitesse et dans un espace dégagé.",

        calibration:
            "La calibration consiste à vérifier l'orientation de la caméra, la qualité de l'image et la réponse des moteurs aux commandes. Ajustez également la position de la caméra afin d'obtenir un champ de vision adapté au déplacement du robot.",

        commonProblems: [
            {
                problem: "La caméra n'affiche aucune image.",
                solution:
                    "Vérifiez la connexion de la caméra, son alimentation, la configuration du programme et les bibliothèques utilisées."
            },
            {
                problem: "L'ESP32-CAM ne se connecte pas au Wi-Fi.",
                solution:
                    "Vérifiez le nom du réseau, le mot de passe, la portée du Wi-Fi et la configuration réseau du programme."
            },
            {
                problem: "L'image est instable.",
                solution:
                    "Vérifiez l'alimentation de l'ESP32-CAM et assurez-vous que les connexions sont stables."
            },
            {
                problem: "Les moteurs ne tournent pas.",
                solution:
                    "Vérifiez l'alimentation du driver, les connexions des moteurs et les signaux de commande."
            },
            {
                problem: "Le robot redémarre lorsque les moteurs démarrent.",
                solution:
                    "Vérifiez l'alimentation et évitez d'alimenter directement l'ESP32-CAM depuis une source insuffisante pour l'ensemble du système."
            },
            {
                problem: "Le robot avance dans la mauvaise direction.",
                solution:
                    "Vérifiez l'ordre des connexions des moteurs ou inversez la commande correspondante dans le programme."
            },
            {
                problem: "La caméra est mal orientée.",
                solution:
                    "Ajustez le support de caméra et fixez-le correctement afin qu'il ne bouge pas pendant le déplacement."
            }
        ],

        safety:
            "Utilisez uniquement une alimentation compatible avec l'ESP32-CAM, le driver et les moteurs. Ne connectez pas les moteurs directement aux broches de l'ESP32-CAM. Gardez les doigts éloignés des roues et des pièces mobiles pendant les tests. Effectuez les modifications de câblage uniquement lorsque l'alimentation est coupée.",

        improvements: [
            "Ajouter une commande complète depuis une interface web.",
            "Ajouter des boutons de déplacement sur téléphone.",
            "Ajouter une caméra orientable avec un servomoteur.",
            "Ajouter un capteur ultrasonique pour détecter les obstacles.",
            "Ajouter un capteur de distance.",
            "Ajouter une transmission vidéo améliorée.",
            "Enregistrer des captures d'image.",
            "Ajouter une vision nocturne adaptée au matériel.",
            "Ajouter un système d'alerte lors de la détection d'un mouvement.",
            "Ajouter une interface mobile plus complète.",
            "Ajouter des capteurs pour éviter automatiquement les obstacles."
        ],

        educational:
            "Ce projet permet d'étudier l'ESP32-CAM, la communication Wi-Fi, la transmission d'images, les moteurs DC, les drivers moteurs et le contrôle à distance. Il introduit également les bases des systèmes IoT et de la robotique connectée.",

        conclusion:
            "Le robot caméra combine mobilité, vision et communication sans fil. Il constitue un projet intéressant pour découvrir comment une caméra connectée peut être intégrée dans un robot afin de surveiller son environnement et de permettre un contrôle à distance."
    },

    ar: {
        title: "روبوت الكاميرا",

        description:
            "إنجاز روبوت متحرك مزود بكاميرا ESP32-CAM قادر على إرسال الصور عبر Wi-Fi ومراقبة محيطه، ويمكن في نسخة متقدمة التحكم فيه عن بعد باستعمال واجهة ويب.",

        tags: [
            "ESP32-CAM",
            "Wi-Fi",
            "كاميرا",
            "روبوت متحرك",
            "إنترنت الأشياء",
            "تحكم عن بعد"
        ],

        material: [
            "ESP32-CAM",
            "هيكل روبوت",
            "محركان DC أو 4 محركات حسب الهيكل",
            "Driver للمحركات",
            "عجلات",
            "بطارية مناسبة",
            "محول جهد عند الحاجة",
            "أسلاك Dupont",
            "مفتاح تشغيل",
            "حامل للكاميرا",
            "كابل USB أو مبرمج مناسب لـ ESP32-CAM"
        ],

        componentsDetails: [
            {
                name: "ESP32-CAM",
                explanation:
                    "تمثل ESP32-CAM وحدة التحكم الرئيسية في نظام الرؤية. فهي تتحكم في الكاميرا وتعالج الصور ويمكنها إرسال الصور أو بث الفيديو عبر شبكة Wi-Fi."
            },
            {
                name: "الكاميرا",
                explanation:
                    "تسمح الكاميرا بالتقاط صور للبيئة المحيطة بالروبوت. ويمكن مشاهدة الصور عن بعد من جهاز متصل بالشبكة نفسها عندما يسمح البرنامج بذلك."
            },
            {
                name: "محركات DC",
                explanation:
                    "تسمح المحركات للروبوت بالتحرك إلى الأمام والخلف والدوران. ويتم التحكم فيها باستعمال Driver للمحركات بدل توصيلها مباشرة بمخارج ESP32-CAM."
            },
            {
                name: "Driver المحركات",
                explanation:
                    "يسمح Driver للمحركات للنظام بالتحكم في اتجاه دوران المحركات، ويمكن لبعض الأنواع أيضًا التحكم في سرعتها."
            },
            {
                name: "البطارية",
                explanation:
                    "توفر البطارية الطاقة اللازمة لتشغيل الروبوت. ويجب استعمال مصدر طاقة مناسب للجهد والتيار المطلوبين."
            },
            {
                name: "Wi-Fi",
                explanation:
                    "يسمح اتصال Wi-Fi بإرسال صور الكاميرا، ويمكن أيضًا استعماله لاستقبال أوامر التحكم في حركة الروبوت عن بعد."
            }
        ],

        principle:
            "يستعمل الروبوت ESP32-CAM لالتقاط الصور وإرسالها عبر Wi-Fi. ويمكن لـ ESP32-CAM إنشاء واجهة ويب صغيرة تسمح بمشاهدة الكاميرا. وفي النسخة المتحركة يمكن إضافة نظام تحكم في المحركات لتحريك الروبوت مع مشاهدة محيطه.",

        mechanicalAssembly:
            "ابدأ بتجميع هيكل الروبوت وتركيب العجلات والمحركات. بعد ذلك قم بتثبيت ESP32-CAM بشكل جيد بحيث تكون الكاميرا موجهة نحو الأمام. تأكد من أن الكاميرا تمتلك مجال رؤية مناسب وأن الأسلاك لا تلامس العجلات أو الأجزاء المتحركة.",

        electricalAssembly:
            "قم بتوصيل المحركات مع Driver ثم اربط مداخل التحكم في Driver بنظام التحكم. يجب أن تحصل ESP32-CAM على مصدر طاقة متوافق مع مواصفاتها. إذا تم استعمال أكثر من مصدر للطاقة، فيجب توحيد الأرضي بالشكل الصحيح حسب الدارة.",

        wiring:
            "تتحكم ESP32-CAM في الكاميرا والاتصال عبر Wi-Fi. يتم ربط المحركات مع Driver الذي يستقبل أوامر الحركة. لا يجب توصيل المحركات مباشرة بمخارج ESP32-CAM لأنها تحتاج إلى تيار أكبر.",

        wiringDetails: [
            "تثبيت ESP32-CAM على حامل ثابت.",
            "تركيب المحركات على هيكل الروبوت.",
            "تركيب العجلات على المحركات.",
            "توصيل المحركات مع Driver.",
            "توصيل مداخل التحكم في Driver بنظام التحكم.",
            "تحضير مصدر طاقة مناسب لـ ESP32-CAM.",
            "تحضير مصدر طاقة مناسب للمحركات.",
            "ربط الأرضي بشكل صحيح عند الحاجة.",
            "تركيب مفتاح تشغيل عام.",
            "تثبيت الكاميرا بشكل جيد.",
            "التأكد من أن الأسلاك لا تعيق العجلات.",
            "اختبار الكاميرا بشكل منفصل.",
            "اختبار المحركات قبل تشغيل النظام الكامل."
        ],

        algorithm:
            "عند تشغيل النظام تقوم ESP32-CAM بتهيئة الكاميرا والاتصال بشبكة Wi-Fi. بعد ذلك ينتظر النظام طلبات المستخدم. عند طلب صورة أو بث فيديو تقوم الكاميرا بالتقاط البيانات وإرسالها إلى الواجهة. وفي النسخة المتحركة تسمح الأوامر أيضًا بالتحكم في المحركات مثل التقدم والتراجع والدوران يمينًا ويسارًا.",

        programming:
            "يمكن برمجة المشروع باستعمال Arduino IDE والمكتبات المناسبة لـ ESP32-CAM. يقوم البرنامج بتهيئة الكاميرا وإنشاء اتصال Wi-Fi وإنشاء واجهة ويب عند الحاجة. ويمكن إضافة أزرار إلى الواجهة لإرسال أوامر التحكم في الروبوت. ويتم التحكم في المحركات باستعمال Driver مناسب.",

        steps: [
            "تحضير هيكل الروبوت.",
            "تركيب المحركات.",
            "تركيب العجلات.",
            "تثبيت حامل ESP32-CAM.",
            "تركيب ESP32-CAM.",
            "تثبيت الكاميرا بشكل جيد.",
            "تركيب Driver المحركات.",
            "توصيل المحركات مع Driver.",
            "تحضير مصدر الطاقة.",
            "التحقق من الجهود المطلوبة.",
            "توصيل ESP32-CAM.",
            "تثبيت بيئة البرمجة.",
            "تثبيت المكتبات اللازمة.",
            "رفع برنامج اختبار الكاميرا.",
            "إعداد اتصال Wi-Fi.",
            "عرض عنوان الشبكة الخاص بالروبوت.",
            "فتح واجهة الكاميرا من جهاز مصرح له.",
            "اختبار إرسال الصور.",
            "اختبار كل محرك بشكل منفصل.",
            "اختبار الحركة إلى الأمام.",
            "اختبار الحركة إلى الخلف.",
            "اختبار الدوران.",
            "إنشاء واجهة للتحكم عند الحاجة.",
            "اختبار الكاميرا والحركة في نفس الوقت.",
            "تثبيت الأسلاك وإنهاء الروبوت."
        ],

        testing:
            "اختبر الكاميرا أولًا دون تشغيل المحركات. بعد ذلك اختبر كل محرك بشكل منفصل. وبعد التأكد من صحة النظامين، اختبر حركة الروبوت مع تشغيل الكاميرا. ابدأ بسرعة منخفضة وفي مكان مفتوح وآمن.",

        calibration:
            "تتم المعايرة من خلال التحقق من اتجاه الكاميرا وجودة الصورة واستجابة المحركات للأوامر. قم أيضًا بتعديل وضعية الكاميرا للحصول على مجال رؤية مناسب أثناء حركة الروبوت.",

        commonProblems: [
            {
                problem: "الكاميرا لا تعرض أي صورة.",
                solution:
                    "تحقق من توصيل الكاميرا ومصدر الطاقة وإعدادات البرنامج والمكتبات المستعملة."
            },
            {
                problem: "ESP32-CAM لا تتصل بشبكة Wi-Fi.",
                solution:
                    "تحقق من اسم الشبكة وكلمة المرور وقوة الإشارة وإعدادات الشبكة في البرنامج."
            },
            {
                problem: "الصورة غير مستقرة.",
                solution:
                    "تحقق من مصدر الطاقة الخاص بـ ESP32-CAM ومن ثبات التوصيلات."
            },
            {
                problem: "المحركات لا تدور.",
                solution:
                    "تحقق من تغذية Driver وتوصيلات المحركات وإشارات التحكم."
            },
            {
                problem: "الروبوت يعيد التشغيل عند تشغيل المحركات.",
                solution:
                    "تحقق من مصدر الطاقة وتجنب تشغيل ESP32-CAM من مصدر غير قادر على توفير الطاقة المطلوبة للنظام."
            },
            {
                problem: "الروبوت يتحرك في الاتجاه الخاطئ.",
                solution:
                    "تحقق من ترتيب توصيلات المحركات أو قم بتعديل أمر الحركة المناسب في البرنامج."
            },
            {
                problem: "الكاميرا موجهة في الاتجاه الخاطئ.",
                solution:
                    "قم بتعديل حامل الكاميرا وتثبيته جيدًا حتى لا يتحرك أثناء سير الروبوت."
            }
        ],

        safety:
            "استعمل فقط مصدر طاقة متوافقًا مع ESP32-CAM وDriver والمحركات. لا تقم بتوصيل المحركات مباشرة بمخارج ESP32-CAM. أبعد أصابعك عن العجلات والأجزاء المتحركة أثناء الاختبارات. افصل الطاقة قبل تعديل أي توصيلات.",

        improvements: [
            "إضافة تحكم كامل من خلال واجهة ويب.",
            "إضافة أزرار للتحكم في الحركة من الهاتف.",
            "إضافة كاميرا قابلة للدوران باستعمال Servomoteur.",
            "إضافة حساس Ultrason لقياس العوائق.",
            "إضافة حساس للمسافة.",
            "تحسين جودة بث الفيديو.",
            "إضافة إمكانية حفظ الصور.",
            "إضافة نظام رؤية ليلية مناسب للمكونات.",
            "إضافة نظام تنبيه عند اكتشاف حركة.",
            "إنشاء واجهة هاتف أكثر تطورًا.",
            "إضافة حساسات تسمح بتجنب العوائق تلقائيًا."
        ],

        educational:
            "يسمح هذا المشروع بتعلم ESP32-CAM والاتصال عبر Wi-Fi وإرسال الصور ومحركات DC وDrivers والتحكم عن بعد. كما يقدم أساسيات أنظمة IoT والروبوتات المتصلة بالشبكة.",

        conclusion:
            "يجمع روبوت الكاميرا بين الحركة والرؤية والاتصال اللاسلكي. وهو مشروع ممتاز لاكتشاف كيفية دمج كاميرا متصلة داخل روبوت لمراقبة محيطه وإتاحة التحكم فيه عن بعد."
    }
},
   {
    id: 10,
    icon: "🛸",

    fr: {
        title: "Robot Télécommandé",

        description:
            "Concevez un robot mobile capable de recevoir des commandes à distance depuis un téléphone grâce à une connexion Bluetooth et de contrôler plusieurs moteurs pour se déplacer.",

        tags: [
            "Bluetooth",
            "Arduino",
            "HC-05",
            "Moteurs DC",
            "L298N",
            "Robot mobile"
        ],

        material: [
            "Arduino Uno",
            "Module Bluetooth HC-05",
            "2 moteurs DC",
            "Driver moteur L298N",
            "2 roues motrices",
            "Roue libre ou roulette avant",
            "Châssis de robot",
            "Batterie adaptée",
            "Interrupteur",
            "Fils Dupont",
            "Plaque d'essai si nécessaire",
            "Téléphone compatible Bluetooth"
        ],

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "Arduino constitue l'unité de commande du robot. Il reçoit les commandes provenant du module Bluetooth et les transforme en instructions permettant de contrôler le driver moteur."
            },
            {
                name: "HC-05",
                explanation:
                    "Le HC-05 est un module Bluetooth série. Il permet à Arduino de recevoir des données envoyées sans fil depuis un appareil compatible, comme un téléphone."
            },
            {
                name: "Moteurs DC",
                explanation:
                    "Les moteurs DC permettent au robot de se déplacer. En contrôlant séparément les deux moteurs, il est possible d'avancer, reculer et tourner."
            },
            {
                name: "Driver L298N",
                explanation:
                    "Le L298N permet de contrôler le sens de rotation des moteurs et, selon le montage et le programme, leur vitesse. Il sert d'interface entre Arduino et les moteurs."
            },
            {
                name: "Châssis et roues",
                explanation:
                    "Le châssis supporte les composants du robot. Les roues permettent de transformer la rotation des moteurs en déplacement."
            },
            {
                name: "Batterie",
                explanation:
                    "La batterie fournit l'énergie nécessaire aux moteurs et au système électronique. Elle doit être adaptée aux caractéristiques des composants utilisés."
            }
        ],

        principle:
            "Le téléphone envoie une commande au module Bluetooth HC-05. Le HC-05 transmet cette commande à Arduino via une communication série. Arduino interprète ensuite la commande et contrôle le driver L298N afin de faire tourner les moteurs dans la direction souhaitée. Des commandes différentes peuvent être utilisées pour avancer, reculer, tourner ou arrêter le robot.",

        mechanicalAssembly:
            "Commencez par assembler le châssis du robot. Fixez les deux moteurs sur les côtés du châssis puis installez les roues. Ajoutez une roulette libre si nécessaire afin de maintenir l'équilibre du robot. Fixez Arduino, le module Bluetooth et le driver L298N sur le châssis en laissant suffisamment d'espace pour les câbles.",

        electricalAssembly:
            "Connectez les deux moteurs aux sorties du driver L298N. Reliez les entrées de commande du L298N aux sorties numériques d'Arduino. Le HC-05 est connecté à Arduino à travers une communication série. La batterie doit alimenter le système avec une tension compatible et les connexions doivent être correctement isolées.",

        wiring:
            "Le HC-05 communique avec Arduino à travers une liaison série. Arduino reçoit les caractères ou commandes envoyés par le téléphone puis commande le L298N. Le driver fournit ensuite la puissance nécessaire aux moteurs et contrôle leur sens de rotation.",

        wiringDetails: [
            "Installer Arduino Uno sur le châssis.",
            "Fixer le driver L298N.",
            "Installer le module Bluetooth HC-05.",
            "Fixer les deux moteurs DC.",
            "Installer les roues.",
            "Connecter le premier moteur au driver L298N.",
            "Connecter le deuxième moteur au driver L298N.",
            "Relier les entrées de commande du L298N à Arduino.",
            "Connecter le HC-05 à Arduino selon le câblage série choisi.",
            "Vérifier les connexions d'alimentation et de masse.",
            "Connecter la batterie à l'alimentation prévue.",
            "Installer un interrupteur général.",
            "Vérifier que les fils ne touchent pas les roues.",
            "Tester le Bluetooth avant de faire fonctionner les moteurs."
        ],

        algorithm:
            "Au démarrage, Arduino initialise le module Bluetooth et les sorties du driver moteur. Le programme attend ensuite une commande provenant du téléphone. Si la commande correspond à avancer, les deux moteurs tournent dans le sens nécessaire. Pour reculer, leur sens est inversé. Pour tourner, un moteur peut être arrêté ou tourner dans un sens différent de l'autre. Lorsque la commande d'arrêt est reçue, les moteurs sont arrêtés.",

        programming:
            "La programmation peut être réalisée avec Arduino IDE. Le programme utilise une communication série pour recevoir les commandes du HC-05. Chaque commande peut être associée à une fonction : avancer, reculer, gauche, droite et arrêt. Le driver L298N est ensuite commandé à partir des sorties numériques d'Arduino.",

        steps: [
            "Préparer le châssis du robot.",
            "Installer les deux moteurs DC.",
            "Installer les roues.",
            "Ajouter une roulette libre si nécessaire.",
            "Fixer Arduino Uno.",
            "Fixer le driver L298N.",
            "Installer le module HC-05.",
            "Connecter les moteurs au L298N.",
            "Connecter les entrées de commande du L298N à Arduino.",
            "Connecter le module Bluetooth.",
            "Vérifier les connexions de masse.",
            "Préparer une alimentation adaptée.",
            "Installer l'interrupteur.",
            "Téléverser le programme Arduino.",
            "Tester la communication Bluetooth.",
            "Associer le téléphone au HC-05.",
            "Tester la commande d'arrêt.",
            "Tester la marche avant.",
            "Tester la marche arrière.",
            "Tester le virage à gauche.",
            "Tester le virage à droite.",
            "Tester les commandes dans différentes séquences.",
            "Ajuster les directions des moteurs si nécessaire.",
            "Tester le robot sur une surface dégagée.",
            "Fixer définitivement les câbles."
        ],

        testing:
            "Commencez par tester le module Bluetooth sans faire tourner les moteurs. Testez ensuite chaque moteur séparément. Après validation, effectuez les premiers déplacements à faible vitesse dans un espace dégagé. Vérifiez que la commande d'arrêt fonctionne correctement avant les autres essais.",

        calibration:
            "La calibration consiste à vérifier que les deux moteurs produisent un déplacement équilibré. Si le robot dévie lorsqu'il avance, ajustez la vitesse ou les commandes des moteurs. Vérifiez également le sens de rotation de chaque moteur.",

        commonProblems: [
            {
                problem: "Le téléphone ne détecte pas le HC-05.",
                solution:
                    "Vérifiez l'alimentation du module, son état de fonctionnement et les paramètres Bluetooth du téléphone."
            },
            {
                problem: "Le HC-05 est connecté mais Arduino ne reçoit aucune commande.",
                solution:
                    "Vérifiez les connexions série, les broches utilisées et la vitesse de communication configurée dans le programme."
            },
            {
                problem: "Un moteur ne tourne pas.",
                solution:
                    "Vérifiez les connexions du moteur, son alimentation et les sorties correspondantes du L298N."
            },
            {
                problem: "Le robot avance dans la mauvaise direction.",
                solution:
                    "Inversez les connexions du moteur concerné ou modifiez la logique de commande dans le programme."
            },
            {
                problem: "Le robot tourne alors qu'il devrait avancer.",
                solution:
                    "Vérifiez que les deux moteurs fonctionnent correctement et que leurs vitesses et directions sont correctement configurées."
            },
          {
    problem: "Arduino redémarre lorsque les moteurs démarrent.",
    solution:
        "Vérifiez l'alimentation et assurez-vous que la source utilisée est adaptée à la consommation des moteurs et de l'électronique. Vérifiez également le programme de communication et évitez les délais inutiles qui pourraient ralentir le traitement des commandes."
}
        ],

        safety:
            "Utilisez une alimentation adaptée aux composants. Ne branchez pas les moteurs directement sur les sorties d'Arduino. Gardez les doigts et les objets éloignés des roues pendant les tests. Effectuez les modifications de câblage lorsque l'alimentation est coupée et utilisez le robot dans un espace dégagé.",

        improvements: [
            "Ajouter une commande de vitesse.",
            "Ajouter un joystick Bluetooth.",
            "Créer une application mobile dédiée.",
            "Ajouter des capteurs ultrasoniques.",
            "Ajouter un système d'évitement automatique des obstacles.",
            "Ajouter des LEDs indiquant l'état du robot.",
            "Ajouter un buzzer pour les notifications.",
            "Ajouter un écran pour afficher l'état du robot.",
            "Ajouter une caméra pour obtenir un robot contrôlé avec vision.",
            "Ajouter une commande Wi-Fi en complément du Bluetooth.",
            "Créer plusieurs modes de conduite."
        ],

        educational:
            "Ce projet permet d'étudier Arduino, la communication Bluetooth série, les moteurs DC, le driver L298N et la commande d'un robot à distance. Il permet également de comprendre les principes de communication sans fil et de contrôle des systèmes robotiques.",

        conclusion:
            "Le robot télécommandé est un excellent projet pour découvrir la robotique mobile et la communication sans fil. Il combine programmation, électronique, moteurs et Bluetooth afin de créer un système contrôlable à distance."
    },

    ar: {
        title: "روبوت يتم التحكم فيه عن بعد",

        description:
            "إنجاز روبوت متحرك يمكن التحكم فيه عن بعد باستعمال الهاتف واتصال Bluetooth، مع إمكانية التحكم في عدة محركات لتحريك الروبوت.",

        tags: [
            "Bluetooth",
            "Arduino",
            "HC-05",
            "محركات DC",
            "L298N",
            "روبوت متحرك"
        ],

        material: [
            "Arduino Uno",
            "وحدة Bluetooth HC-05",
            "محركان DC",
            "Driver L298N",
            "عجلتان للحركة",
            "عجلة حرة أمامية",
            "هيكل روبوت",
            "بطارية مناسبة",
            "مفتاح تشغيل",
            "أسلاك Dupont",
            "لوحة تجارب عند الحاجة",
            "هاتف يدعم Bluetooth"
        ],

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "تمثل Arduino وحدة التحكم في الروبوت. تستقبل الأوامر القادمة من وحدة Bluetooth وتحولها إلى تعليمات للتحكم في Driver المحركات."
            },
            {
                name: "HC-05",
                explanation:
                    "وحدة HC-05 هي وحدة Bluetooth تعمل كاتصال تسلسلي. تسمح لـ Arduino باستقبال البيانات المرسلة لاسلكيًا من جهاز متوافق مثل الهاتف."
            },
            {
                name: "محركات DC",
                explanation:
                    "تسمح محركات DC بتحريك الروبوت. ومن خلال التحكم بشكل منفصل في المحركين يمكن جعل الروبوت يتقدم ويتراجع ويدور."
            },
            {
                name: "Driver L298N",
                explanation:
                    "يسمح L298N بالتحكم في اتجاه دوران المحركات، ويمكن حسب طريقة التوصيل والبرنامج التحكم في سرعتها أيضًا. وهو يمثل حلقة الوصل بين Arduino والمحركات."
            },
            {
                name: "الهيكل والعجلات",
                explanation:
                    "يحمل الهيكل جميع مكونات الروبوت، بينما تسمح العجلات بتحويل دوران المحركات إلى حركة فعلية."
            },
            {
                name: "البطارية",
                explanation:
                    "توفر البطارية الطاقة اللازمة للمحركات والنظام الإلكتروني، ويجب اختيارها حسب الجهد والتيار المطلوبين للمكونات."
            }
        ],

        principle:
            "يرسل الهاتف أمرًا إلى وحدة Bluetooth HC-05. تقوم HC-05 بإرسال الأمر إلى Arduino عبر الاتصال التسلسلي. تقوم Arduino بتحليل الأمر ثم تتحكم في Driver L298N لتدوير المحركات في الاتجاه المطلوب. ويمكن استعمال أوامر مختلفة للتقدم والتراجع والدوران والتوقف.",

        mechanicalAssembly:
            "ابدأ بتجميع هيكل الروبوت. ثبت المحركين على جانبي الهيكل ثم قم بتركيب العجلات. أضف عجلة حرة عند الحاجة للحفاظ على توازن الروبوت. ثبت Arduino ووحدة Bluetooth وDriver L298N على الهيكل مع ترك مساحة كافية للأسلاك.",

        electricalAssembly:
            "قم بتوصيل المحركين بمخارج Driver L298N. ثم اربط مداخل التحكم في L298N بالمخارج الرقمية في Arduino. يتم توصيل HC-05 مع Arduino من خلال الاتصال التسلسلي. يجب أن توفر البطارية جهدًا مناسبًا للمكونات وأن تكون جميع التوصيلات معزولة بشكل جيد.",

        wiring:
            "تتواصل HC-05 مع Arduino من خلال الاتصال التسلسلي. تستقبل Arduino الأوامر المرسلة من الهاتف ثم تتحكم في L298N. يقوم Driver بعد ذلك بتوفير الطاقة اللازمة للمحركات والتحكم في اتجاه دورانها.",

        wiringDetails: [
            "تثبيت Arduino Uno على هيكل الروبوت.",
            "تثبيت Driver L298N.",
            "تركيب وحدة Bluetooth HC-05.",
            "تثبيت محركي DC.",
            "تركيب العجلات.",
            "توصيل المحرك الأول مع L298N.",
            "توصيل المحرك الثاني مع L298N.",
            "ربط مداخل التحكم في L298N مع Arduino.",
            "توصيل HC-05 مع Arduino حسب التوصيل التسلسلي المستخدم.",
            "التحقق من توصيلات التغذية والأرضي.",
            "توصيل البطارية بمصدر الطاقة المخصص.",
            "تركيب مفتاح تشغيل عام.",
            "التأكد من أن الأسلاك لا تلامس العجلات.",
            "اختبار Bluetooth قبل تشغيل المحركات."
        ],

        algorithm:
            "عند تشغيل النظام تقوم Arduino بتهيئة وحدة Bluetooth ومخارج التحكم في Driver. بعد ذلك ينتظر البرنامج أمرًا قادمًا من الهاتف. إذا كان الأمر هو التقدم، يدور المحركان في الاتجاه المطلوب. وعند التراجع يتم عكس اتجاه الدوران. وللدوران يمكن إيقاف أحد المحركين أو تشغيل المحركين في اتجاهين مختلفين. وعند استقبال أمر التوقف تتوقف المحركات.",

        programming:
            "يمكن برمجة المشروع باستعمال Arduino IDE. يستعمل البرنامج الاتصال التسلسلي لاستقبال الأوامر القادمة من HC-05. ويمكن ربط كل أمر بدالة مثل التقدم والتراجع واليمين واليسار والتوقف. بعد ذلك يتم التحكم في L298N باستعمال المخارج الرقمية لـ Arduino.",

        steps: [
            "تحضير هيكل الروبوت.",
            "تركيب محركي DC.",
            "تركيب العجلات.",
            "إضافة عجلة حرة عند الحاجة.",
            "تثبيت Arduino Uno.",
            "تثبيت Driver L298N.",
            "تركيب وحدة HC-05.",
            "توصيل المحركات مع L298N.",
            "توصيل مداخل التحكم في L298N مع Arduino.",
            "توصيل وحدة Bluetooth.",
            "التحقق من توصيلات الأرضي.",
            "تحضير مصدر طاقة مناسب.",
            "تركيب مفتاح التشغيل.",
            "رفع برنامج Arduino.",
            "اختبار اتصال Bluetooth.",
            "ربط الهاتف بوحدة HC-05.",
            "اختبار أمر التوقف.",
            "اختبار الحركة إلى الأمام.",
            "اختبار الحركة إلى الخلف.",
            "اختبار الدوران إلى اليسار.",
            "اختبار الدوران إلى اليمين.",
            "اختبار الأوامر في تسلسلات مختلفة.",
            "تعديل اتجاه المحركات عند الحاجة.",
            "اختبار الروبوت على سطح مفتوح.",
            "تثبيت الأسلاك بشكل نهائي."
        ],

        testing:
            "ابدأ باختبار Bluetooth دون تشغيل المحركات. بعد ذلك اختبر كل محرك بشكل منفصل. وبعد التأكد من عملهما، قم بأول تجربة للحركة بسرعة منخفضة وفي مكان مفتوح. تأكد من أن أمر التوقف يعمل بشكل صحيح قبل مواصلة الاختبارات.",

        calibration:
            "تتم المعايرة من خلال التأكد من أن المحركين ينتجان حركة متوازنة. إذا كان الروبوت ينحرف أثناء التقدم، قم بتعديل سرعة أو أوامر المحركات. وتأكد أيضًا من اتجاه دوران كل محرك.",

        commonProblems: [
            {
                problem: "الهاتف لا يجد HC-05.",
                solution:
                    "تحقق من تغذية الوحدة وحالتها وإعدادات Bluetooth في الهاتف."
            },
            {
                problem: "HC-05 متصلة ولكن Arduino لا تستقبل الأوامر.",
                solution:
                    "تحقق من توصيلات الاتصال التسلسلي والمنافذ المستخدمة وسرعة الاتصال الموجودة في البرنامج."
            },
            {
                problem: "أحد المحركات لا يدور.",
                solution:
                    "تحقق من توصيل المحرك ومصدر الطاقة والمخرج المقابل في L298N."
            },
            {
                problem: "الروبوت يتحرك في الاتجاه الخاطئ.",
                solution:
                    "قم بعكس توصيلات المحرك المعني أو عدّل منطق التحكم في البرنامج."
            },
            {
                problem: "الروبوت يدور بدل أن يتقدم.",
                solution:
                    "تحقق من أن المحركين يعملان بشكل صحيح وأن سرعتهما واتجاههما مضبوطين."
            },
            {
                problem: "Arduino تعيد التشغيل عند تشغيل المحركات.",
                solution:
                    "تحقق من مصدر الطاقة وتأكد من أنه مناسب لاستهلاك المحركات والنظام الإلكتروني."
            },
            {
                problem: "الروبوت يستجيب بتأخير للأوامر.",
                solution:
                    "تحقق من برنامج الاتصال وتجنب التأخيرات غير الضرورية التي قد تبطئ معالجة الأوامر."
            }
        ],

        safety:
            "استعمل مصدر طاقة مناسبًا للمكونات. لا تقم بتوصيل المحركات مباشرة بمخارج Arduino. أبعد أصابعك والأجسام عن العجلات أثناء الاختبارات. افصل الطاقة قبل تعديل التوصيلات واستعمل الروبوت في مكان مفتوح وآمن.",

        improvements: [
            "إضافة التحكم في سرعة الروبوت.",
            "إضافة Joystick عبر Bluetooth.",
            "إنشاء تطبيق هاتف خاص بالروبوت.",
            "إضافة حساسات Ultrason.",
            "إضافة نظام لتجنب العوائق تلقائيًا.",
            "إضافة LEDs لعرض حالة الروبوت.",
            "إضافة Buzzer للتنبيهات.",
            "إضافة شاشة لعرض حالة الروبوت.",
            "إضافة كاميرا للحصول على روبوت يتم التحكم فيه مع الرؤية.",
            "إضافة Wi-Fi إلى جانب Bluetooth.",
            "إنشاء عدة أنماط للتحكم في الروبوت."
        ],

        educational:
            "يسمح هذا المشروع بتعلم Arduino والاتصال التسلسلي عبر Bluetooth ومحركات DC وDriver L298N والتحكم في الروبوت عن بعد. كما يساعد على فهم مبادئ الاتصال اللاسلكي والتحكم في الأنظمة الروبوتية.",

        conclusion:
            "يعتبر الروبوت الذي يتم التحكم فيه عن بعد مشروعًا ممتازًا لاكتشاف الروبوتات المتحركة والاتصال اللاسلكي. فهو يجمع بين البرمجة والإلكترونيات والمحركات وBluetooth لإنشاء نظام يمكن التحكم فيه عن بعد."
    }
},

{
    id: 11,
    icon: "🏭🤖",

    fr: {
        title: "Mini Ligne Industrielle",

        description:
            "Concevez une mini-ligne industrielle automatisée capable de détecter, transporter, trier et déplacer de petits objets afin de simuler le fonctionnement d'un système de production intelligent.",

        tags: [
            "Arduino",
            "Automatisation",
            "Capteurs",
            "Convoyeur",
            "Servomoteur",
            "Moteur DC",
            "Industrie 4.0"
        ],

        material: [
            "Arduino Uno",
            "Mini convoyeur",
            "Moteur DC",
            "Driver moteur",
            "Servomoteur",
            "Capteur infrarouge",
            "Capteur de distance",
            "Capteur de couleur si disponible",
            "Plaque d'essai",
            "Fils Dupont",
            "Alimentation adaptée",
            "Petits objets légers pour les tests",
            "Structure mécanique du convoyeur"
        ],

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "Arduino constitue l'unité de commande de la mini-ligne. Il reçoit les informations des capteurs et commande les moteurs et les actionneurs selon le programme."
            },
            {
                name: "Convoyeur",
                explanation:
                    "Le convoyeur permet de déplacer les objets d'un point à un autre de la ligne de production. Il représente le système de transport utilisé dans une installation industrielle."
            },
            {
                name: "Moteur DC",
                explanation:
                    "Le moteur DC entraîne le convoyeur. Sa rotation permet de déplacer la bande et les objets placés dessus."
            },
            {
                name: "Capteur infrarouge",
                explanation:
                    "Le capteur infrarouge permet de détecter la présence d'un objet sur le convoyeur. Arduino peut utiliser cette information pour déclencher une action."
            },
            {
                name: "Servomoteur",
                explanation:
                    "Le servomoteur peut être utilisé comme actionneur pour déplacer, pousser ou trier un objet vers une autre partie de la ligne."
            },
            {
                name: "Capteur de distance",
                explanation:
                    "Le capteur de distance permet de détecter la position ou la présence d'un objet sans contact direct."
            },
            {
                name: "Driver moteur",
                explanation:
                    "Le driver moteur permet de commander le moteur du convoyeur avec une puissance adaptée. Il évite de connecter directement le moteur aux sorties d'Arduino."
            }
        ],

        principle:
            "La mini-ligne industrielle reproduit les principales étapes d'un système automatisé. Le convoyeur transporte les objets tandis que les capteurs détectent leur présence. Arduino analyse les informations reçues et commande les actionneurs. Lorsqu'un objet atteint une position déterminée, le système peut arrêter le convoyeur, trier l'objet avec un servomoteur ou poursuivre automatiquement son déplacement.",

        mechanicalAssembly:
            "Construisez d'abord la structure du convoyeur et vérifiez que la bande peut se déplacer librement. Installez ensuite le moteur et fixez-le correctement au mécanisme. Placez les capteurs à différents points de la ligne. Installez enfin le servomoteur ou le mécanisme de tri dans une position permettant de déplacer les objets sans bloquer le convoyeur.",

        electricalAssembly:
            "Le moteur du convoyeur doit être connecté à un driver moteur adapté. Les capteurs sont reliés aux entrées d'Arduino. Le servomoteur est connecté à une sortie de commande appropriée et reçoit une alimentation compatible. Vérifiez que la puissance nécessaire aux moteurs et aux actionneurs est disponible.",

        wiring:
            "Les capteurs transmettent leurs informations à Arduino. Arduino traite ces informations puis commande le driver du moteur du convoyeur et le servomoteur. Par exemple, lorsqu'un capteur détecte un objet, Arduino peut arrêter le convoyeur, actionner le servo pour trier l'objet puis redémarrer automatiquement le système.",

        wiringDetails: [
            "Installer Arduino sur un support stable.",
            "Construire le mini-convoyeur.",
            "Installer le moteur DC.",
            "Connecter le moteur au driver moteur.",
            "Connecter les entrées de commande du driver à Arduino.",
            "Installer le premier capteur de détection.",
            "Installer un capteur supplémentaire si nécessaire.",
            "Connecter les capteurs aux entrées d'Arduino.",
            "Installer le servomoteur du mécanisme de tri.",
            "Connecter le signal du servomoteur à Arduino.",
            "Préparer une alimentation adaptée aux moteurs.",
            "Relier correctement les masses lorsque nécessaire.",
            "Vérifier toutes les connexions.",
            "Tester chaque capteur séparément.",
            "Tester ensuite le moteur et le servomoteur."
        ],

        algorithm:
            "Au démarrage, Arduino initialise les capteurs, le moteur du convoyeur et le servomoteur. Le convoyeur démarre ensuite automatiquement. Lorsqu'un capteur détecte un objet, Arduino vérifie sa position et peut arrêter temporairement le convoyeur. Le système détermine ensuite l'action nécessaire : continuer le transport, déplacer l'objet avec le servomoteur ou le diriger vers une autre zone. Après l'action, le convoyeur redémarre et le cycle recommence.",

        programming:
            "La programmation peut être réalisée avec Arduino IDE. Le programme lit continuellement les capteurs et utilise des conditions pour déterminer les actions à effectuer. Des fonctions peuvent être créées pour démarrer le convoyeur, arrêter le moteur, déplacer le servomoteur et effectuer une opération de tri. Une machine à états peut également être utilisée pour organiser les différentes étapes du processus industriel.",

        steps: [
            "Préparer la structure de la mini-ligne.",
            "Construire le convoyeur.",
            "Installer la bande du convoyeur.",
            "Installer le moteur DC.",
            "Fixer le moteur correctement.",
            "Installer le driver moteur.",
            "Connecter le moteur au driver.",
            "Installer le premier capteur.",
            "Positionner le capteur au-dessus ou à côté du convoyeur.",
            "Ajouter un deuxième capteur si nécessaire.",
            "Installer le servomoteur.",
            "Construire le mécanisme de tri.",
            "Connecter les capteurs à Arduino.",
            "Connecter le servomoteur.",
            "Connecter le driver moteur.",
            "Vérifier l'alimentation.",
            "Téléverser le programme Arduino.",
            "Tester chaque capteur séparément.",
            "Tester le démarrage du convoyeur.",
            "Tester l'arrêt automatique.",
            "Tester la détection d'un objet.",
            "Tester le mécanisme de tri.",
            "Tester le redémarrage du convoyeur.",
            "Effectuer plusieurs cycles automatiques.",
            "Optimiser la vitesse et les temps de fonctionnement.",
            "Finaliser la mini-ligne industrielle."
        ],

        testing:
            "Commencez par tester le convoyeur sans objet. Vérifiez ensuite chaque capteur individuellement. Testez le servomoteur séparément avant de lancer le système complet. Enfin, placez des objets légers sur le convoyeur et vérifiez que la détection, l'arrêt, le tri et le redémarrage fonctionnent correctement.",

        calibration:
            "La calibration consiste à déterminer la position optimale des capteurs et les angles du servomoteur. Il faut également régler la vitesse du convoyeur afin que les capteurs aient suffisamment de temps pour détecter les objets et que le mécanisme de tri puisse fonctionner correctement.",

        commonProblems: [
            {
                problem: "Le convoyeur ne démarre pas.",
                solution:
                    "Vérifiez l'alimentation du moteur, les connexions du driver et les commandes envoyées par Arduino."
            },
            {
                problem: "Le capteur ne détecte pas les objets.",
                solution:
                    "Vérifiez son alimentation, son câblage, sa position et le seuil de détection utilisé dans le programme."
            },
            {
                problem: "Le servomoteur ne fonctionne pas correctement.",
                solution:
                    "Vérifiez son alimentation, son signal de commande et les angles programmés."
            },
            {
                problem: "Le convoyeur s'arrête trop tôt.",
                solution:
                    "Vérifiez la position du capteur et les conditions utilisées dans le programme."
            },
            {
                problem: "Le système rate certains objets.",
                solution:
                    "Réduisez éventuellement la vitesse du convoyeur ou ajustez la position et la sensibilité des capteurs."
            },
            {
                problem: "Le mécanisme de tri bloque les objets.",
                solution:
                    "Ajustez la position et l'angle du servomoteur afin que le mouvement soit suffisamment libre."
            },
            {
                problem: "Arduino redémarre lorsque le moteur fonctionne.",
                solution:
                    "Vérifiez l'alimentation et utilisez une source adaptée à la consommation du moteur et des autres composants."
            }
        ],

        safety:
            "Utilisez uniquement une alimentation adaptée aux composants. Gardez les doigts et les vêtements éloignés du convoyeur et des pièces mobiles. Ne placez pas les mains sur la bande lorsque le moteur fonctionne. Coupez l'alimentation avant toute modification mécanique ou électrique. Utilisez uniquement de petits objets légers pour les essais.",

        improvements: [
            "Ajouter un système automatique de tri par couleur.",
            "Ajouter un capteur de poids.",
            "Ajouter un deuxième convoyeur.",
            "Ajouter plusieurs stations de travail.",
            "Ajouter un écran LCD pour afficher l'état de la production.",
            "Compter automatiquement les objets.",
            "Ajouter un système de détection des objets défectueux.",
            "Ajouter une interface web de supervision.",
            "Ajouter une connexion Wi-Fi.",
            "Enregistrer les données de production.",
            "Afficher des statistiques en temps réel.",
            "Ajouter plusieurs servomoteurs pour effectuer différentes opérations.",
            "Créer une simulation plus proche d'une usine intelligente.",
            "Ajouter une communication entre plusieurs systèmes Arduino ou ESP32."
        ],

        educational:
            "Ce projet permet d'étudier les bases de l'automatisation industrielle, les capteurs, les moteurs, les servomoteurs, les systèmes de commande et la programmation Arduino. Il introduit également les concepts de chaîne de production, de détection, de tri et d'Industrie 4.0.",

        conclusion:
            "La mini-ligne industrielle constitue un projet complet permettant de comprendre comment les capteurs, les actionneurs et un système de commande peuvent travailler ensemble pour automatiser une tâche. Elle représente une introduction pratique à l'automatisation et aux systèmes industriels intelligents."
    },

    ar: {
        title: "خط إنتاج صناعي مصغر",

        description:
            "إنجاز خط إنتاج صناعي مصغر وآلي قادر على اكتشاف الأجسام ونقلها وفرزها وتحريكها لمحاكاة طريقة عمل نظام إنتاج صناعي ذكي.",

        tags: [
            "Arduino",
            "الأتمتة",
            "حساسات",
            "سير ناقل",
            "Servomoteur",
            "محرك DC",
            "الصناعة 4.0"
        ],

        material: [
            "Arduino Uno",
            "سير ناقل صغير",
            "محرك DC",
            "Driver للمحرك",
            "Servomoteur",
            "حساس الأشعة تحت الحمراء",
            "حساس المسافة",
            "حساس ألوان عند توفره",
            "لوحة تجارب",
            "أسلاك Dupont",
            "مصدر طاقة مناسب",
            "أجسام صغيرة وخفيفة للاختبار",
            "هيكل ميكانيكي للسير الناقل"
        ],

        componentsDetails: [
            {
                name: "Arduino Uno",
                explanation:
                    "تمثل Arduino وحدة التحكم في خط الإنتاج. تستقبل المعلومات من الحساسات ثم تتحكم في المحركات والمشغلات حسب البرنامج."
            },
            {
                name: "السير الناقل",
                explanation:
                    "يسمح السير الناقل بنقل الأجسام من مكان إلى آخر داخل خط الإنتاج، ويمثل نظام النقل الموجود في الأنظمة الصناعية."
            },
            {
                name: "محرك DC",
                explanation:
                    "يقوم محرك DC بتحريك السير الناقل. يسمح دوران المحرك بتحريك الحزام والأجسام الموضوعة عليه."
            },
            {
                name: "حساس الأشعة تحت الحمراء",
                explanation:
                    "يسمح الحساس باكتشاف وجود جسم على السير الناقل، ويمكن لـ Arduino استعمال هذه المعلومة لاتخاذ إجراء معين."
            },
            {
                name: "Servomoteur",
                explanation:
                    "يمكن استعمال Servomoteur كمشغل لتحريك أو دفع أو فرز جسم نحو جزء آخر من خط الإنتاج."
            },
            {
                name: "حساس المسافة",
                explanation:
                    "يسمح حساس المسافة باكتشاف موقع أو وجود جسم دون الحاجة إلى ملامسته مباشرة."
            },
            {
                name: "Driver المحرك",
                explanation:
                    "يسمح Driver بالتحكم في محرك السير الناقل مع توفير القدرة المناسبة. ويمنع الحاجة إلى توصيل المحرك مباشرة بمخارج Arduino."
            }
        ],

        principle:
            "يحاكي خط الإنتاج الصناعي المصغر المراحل الأساسية لنظام آلي. يقوم السير الناقل بنقل الأجسام بينما تكتشف الحساسات وجودها. تقوم Arduino بتحليل المعلومات القادمة من الحساسات ثم تتحكم في المشغلات. عندما يصل جسم إلى موضع معين، يمكن للنظام إيقاف السير أو فرز الجسم باستعمال Servomoteur ثم مواصلة عملية النقل تلقائيًا.",

        mechanicalAssembly:
            "ابدأ ببناء هيكل السير الناقل وتأكد من أن الحزام يستطيع الحركة بحرية. بعد ذلك قم بتركيب المحرك وتثبيته جيدًا. ضع الحساسات في نقاط مختلفة من خط الإنتاج. وفي النهاية قم بتركيب Servomoteur أو آلية الفرز في مكان يسمح بتحريك الأجسام دون تعطيل السير الناقل.",

        electricalAssembly:
            "يجب توصيل محرك السير الناقل مع Driver مناسب للمحرك. يتم توصيل الحساسات بمداخل Arduino. يتم توصيل Servomoteur بمخرج تحكم مناسب ويحصل على مصدر طاقة متوافق. تحقق من توفر الطاقة اللازمة للمحركات والمشغلات.",

        wiring:
            "ترسل الحساسات معلوماتها إلى Arduino. تقوم Arduino بمعالجة هذه المعلومات ثم تتحكم في Driver الخاص بمحرك السير وServomoteur. على سبيل المثال، عندما يكتشف أحد الحساسات وجود جسم، يمكن لـ Arduino إيقاف السير وتشغيل Servo لفرز الجسم ثم إعادة تشغيل النظام تلقائيًا.",

        wiringDetails: [
            "تثبيت Arduino على حامل ثابت.",
            "بناء السير الناقل.",
            "تركيب محرك DC.",
            "توصيل المحرك مع Driver.",
            "توصيل مداخل التحكم في Driver مع Arduino.",
            "تركيب حساس الكشف الأول.",
            "إضافة حساس آخر عند الحاجة.",
            "توصيل الحساسات بمداخل Arduino.",
            "تركيب Servomoteur الخاص بالفرز.",
            "توصيل إشارة Servo مع Arduino.",
            "تحضير مصدر طاقة مناسب للمحركات.",
            "ربط الأرضي بشكل صحيح عند الحاجة.",
            "التحقق من جميع التوصيلات.",
            "اختبار كل حساس بشكل منفصل.",
            "اختبار المحرك وServomoteur بعد ذلك."
        ],

        algorithm:
            "عند تشغيل النظام تقوم Arduino بتهيئة الحساسات ومحرك السير وServomoteur. يبدأ السير الناقل بالعمل تلقائيًا. عندما يكتشف أحد الحساسات جسمًا، تقوم Arduino بالتحقق من موقعه ويمكنها إيقاف السير مؤقتًا. بعد ذلك يحدد النظام الإجراء المطلوب: مواصلة النقل أو تحريك الجسم بواسطة Servo أو توجيهه إلى منطقة أخرى. بعد انتهاء العملية يعاود السير العمل وتتكرر الدورة.",

        programming:
            "يمكن برمجة المشروع باستعمال Arduino IDE. يقوم البرنامج بقراءة الحساسات باستمرار واستعمال الشروط لتحديد الإجراءات اللازمة. ويمكن إنشاء دوال لتشغيل السير وإيقافه وتحريك Servo وتنفيذ عملية الفرز. كما يمكن استعمال مفهوم Machine à états لتنظيم المراحل المختلفة لعملية الإنتاج.",

        steps: [
            "تحضير هيكل خط الإنتاج.",
            "بناء السير الناقل.",
            "تركيب حزام السير.",
            "تركيب محرك DC.",
            "تثبيت المحرك جيدًا.",
            "تركيب Driver المحرك.",
            "توصيل المحرك مع Driver.",
            "تركيب الحساس الأول.",
            "وضع الحساس فوق السير أو بجانبه.",
            "إضافة حساس ثانٍ عند الحاجة.",
            "تركيب Servomoteur.",
            "بناء آلية الفرز.",
            "توصيل الحساسات مع Arduino.",
            "توصيل Servomoteur.",
            "توصيل Driver المحرك.",
            "التحقق من مصدر الطاقة.",
            "رفع برنامج Arduino.",
            "اختبار كل حساس بشكل منفصل.",
            "اختبار تشغيل السير.",
            "اختبار التوقف التلقائي.",
            "اختبار اكتشاف الجسم.",
            "اختبار آلية الفرز.",
            "اختبار إعادة تشغيل السير.",
            "إجراء عدة دورات آلية.",
            "تحسين سرعة السير وأوقات التشغيل.",
            "إكمال خط الإنتاج الصناعي المصغر."
        ],

        testing:
            "ابدأ باختبار السير الناقل دون وضع أي جسم عليه. بعد ذلك اختبر كل حساس بشكل منفصل. اختبر Servomoteur بشكل مستقل قبل تشغيل النظام الكامل. وأخيرًا ضع أجسامًا خفيفة على السير وتأكد من أن الاكتشاف والتوقف والفرز وإعادة التشغيل تعمل بشكل صحيح.",

        calibration:
            "تتم المعايرة من خلال تحديد أفضل موضع للحساسات وزوايا حركة Servomoteur. كما يجب ضبط سرعة السير حتى تحصل الحساسات على وقت كافٍ لاكتشاف الأجسام وتتمكن آلية الفرز من العمل بشكل صحيح.",

        commonProblems: [
            {
                problem: "السير الناقل لا يعمل.",
                solution:
                    "تحقق من مصدر طاقة المحرك وتوصيلات Driver والأوامر التي ترسلها Arduino."
            },
            {
                problem: "الحساس لا يكتشف الأجسام.",
                solution:
                    "تحقق من التغذية والتوصيلات وموضع الحساس وقيمة الكشف المستعملة في البرنامج."
            },
            {
                problem: "Servomoteur لا يعمل بشكل صحيح.",
                solution:
                    "تحقق من مصدر الطاقة وإشارة التحكم والزوايا الموجودة في البرنامج."
            },
            {
                problem: "السير يتوقف قبل الوقت المطلوب.",
                solution:
                    "تحقق من موضع الحساس والشروط المستخدمة في البرنامج."
            },
            {
                problem: "النظام لا يكتشف بعض الأجسام.",
                solution:
                    "قم بتقليل سرعة السير عند الحاجة أو عدّل موضع وحساسية الحساسات."
            },
            {
                problem: "آلية الفرز تعيق الأجسام.",
                solution:
                    "قم بتعديل موضع وزاوية Servomoteur حتى تصبح الحركة أكثر سلاسة."
            },
            {
                problem: "Arduino تعيد التشغيل عند تشغيل المحرك.",
                solution:
                    "تحقق من مصدر الطاقة واستعمل مصدرًا مناسبًا لاستهلاك المحرك وباقي المكونات."
            }
        ],

        safety:
            "استعمل مصدر طاقة مناسبًا للمكونات. أبعد الأصابع والملابس عن السير الناقل والأجزاء المتحركة. لا تضع يديك على الحزام أثناء عمل المحرك. افصل الطاقة قبل أي تعديل ميكانيكي أو كهربائي. استعمل أجسامًا صغيرة وخفيفة فقط أثناء الاختبارات.",

        improvements: [
            "إضافة نظام فرز تلقائي حسب اللون.",
            "إضافة حساس لقياس الوزن.",
            "إضافة سير ناقل ثانٍ.",
            "إضافة عدة محطات عمل.",
            "إضافة شاشة LCD لعرض حالة الإنتاج.",
            "حساب عدد الأجسام تلقائيًا.",
            "إضافة نظام لاكتشاف الأجسام غير المطابقة.",
            "إضافة واجهة ويب لمراقبة النظام.",
            "إضافة اتصال Wi-Fi.",
            "تخزين بيانات الإنتاج.",
            "عرض إحصائيات الإنتاج في الوقت الحقيقي.",
            "إضافة عدة Servomoteurs لتنفيذ عمليات مختلفة.",
            "إنشاء محاكاة أقرب إلى المصنع الذكي.",
            "إضافة اتصال بين عدة أنظمة Arduino أو ESP32."
        ],

        educational:
            "يسمح هذا المشروع بدراسة أساسيات الأتمتة الصناعية والحساسات والمحركات وServomoteurs وأنظمة التحكم وبرمجة Arduino. كما يقدم مفاهيم سلسلة الإنتاج والكشف والفرز والصناعة 4.0.",

        conclusion:
            "يمثل خط الإنتاج الصناعي المصغر مشروعًا متكاملًا لفهم كيفية عمل الحساسات والمشغلات ووحدة التحكم معًا لأتمتة مهمة معينة. وهو يقدم تطبيقًا عمليًا ممتازًا للتعرف على الأتمتة والأنظمة الصناعية الذكية."
    }
},

];


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    setLanguage(currentLanguage);

    renderProjects();

    const form = document.getElementById("studentForm");

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const nom =
            document.getElementById("nom").value.trim();

        const prenom =
            document.getElementById("prenom").value.trim();

        const contact =
            document.getElementById("contact").value.trim();

        const niveau =
            document.getElementById("niveau").value;
        const password =
             document.getElementById("password").value

        if (!nom || !prenom || !contact || !password || !niveau) {

            alert(
                currentLanguage === "fr"
                    ? "Veuillez remplir tous les champs."
                    : "يرجى تعمير جميع الخانات."
            );

            return;
        }
/* إنشاء حساب الطالب في Supabase Auth */

const { data: authData, error: authError } =
    await supabaseClient.auth.signUp({
        email: contact,
        password: password
    });

if (authError) {

    console.error("Auth error:", authError);

    alert(
        currentLanguage === "fr"
            ? "Erreur lors de la création du compte : " + authError.message
            : "حدث خطأ أثناء إنشاء الحساب: " + authError.message
    );

    return;
}

        /* إرسال الطلب إلى Supabase */

        const { data, error } =
            await supabaseClient.rpc(
                "submit_student_request",
                {
                    p_nom: nom,
                    p_prenom: prenom,
                    p_contact: contact,
                    p_niveau: niveau
                }
            );


        if (error) {

            console.error("Supabase error:", error);

            alert(
                currentLanguage === "fr"
                    ? "Erreur lors de l'envoi de votre demande."
                    : "حدث خطأ أثناء إرسال طلبك."
            );

            return;
        }


        /* حفظ معلومات الطالب */

        const student = {
            nom,
            prenom,
            contact,
            niveau,
            date: new Date().toISOString()
        };


        localStorage.setItem(
            "student",
            JSON.stringify(student)
        );


        /* حفظ رمز الطلب */

        localStorage.setItem(
            REQUEST_TOKEN_KEY,
            data
        );


        /* المشاريع تبقى مغلقة */

        projectsAuthorized = false;


        /* إغلاق الفورم */

        closeStudentForm();


        /* إظهار رسالة الانتظار */

        showProjectWaitingMessage();

    });

});

/* =====================================================
   STUDENT FORM
===================================================== */

function openStudentForm() {

    document
        .getElementById("studentModal")
        .classList.add("show");

}


function closeStudentForm() {

    document
        .getElementById("studentModal")
        .classList.remove("show");

}


/* =====================================================
   PROJECT ACCESS
===================================================== */

async function openProjects() {

    const { data, error } =
        await supabaseClient.rpc(
            "get_my_request_status"
        );

    if (error) {

        console.error("Supabase error:", error);

        alert(
            currentLanguage === "fr"
                ? "Erreur de connexion au serveur."
                : "حدث خطأ في الاتصال بالخادم."
        );

        return;
    }


    if (data === "approved") {

        projectsAuthorized = true;

        closeProjectWaitingMessage();

        document.getElementById("homePage").style.display = "none";

        document
            .querySelectorAll(".info-section")
            .forEach(section => {
                section.style.display = "none";
            });

        const projectsPage =
            document.getElementById("projectsPage");

        projectsPage.classList.add("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    if (data === "pending") {

        projectsAuthorized = false;

        showProjectWaitingMessage();

        return;
    }


    if (data === "rejected") {

        projectsAuthorized = false;

        alert(
            currentLanguage === "fr"
                ? "Votre demande a été refusée."
                : "تم رفض طلبك."
        );

        return;
    }


    if (data === "not_found") {

        openStudentForm();

        return;
    }
}

/* =====================================================
   HOME
===================================================== */

function showHome() {

    document
        .getElementById("projectsPage")
        .classList.remove("show");


    document
        .getElementById("homePage")
        .style.display = "block";


    document
        .querySelectorAll(".info-section")
        .forEach(section => {

            section.style.display = "none";

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   OTHER SECTIONS
===================================================== */

function showSection(id) {

    if (id === "projects") {

        openProjects();

        return;

    }


    document
        .getElementById("projectsPage")
        .classList.remove("show");


    document
        .getElementById("homePage")
        .style.display = "none";


    document
        .querySelectorAll(".info-section")
        .forEach(section => {

            section.style.display = "none";

        });


    const section =
        document.getElementById(id);


    if (section) {

        section.style.display = "block";

        setTimeout(() => {

            section.scrollIntoView({
                behavior: "smooth"
            });

        }, 50);

    }

}


/* =====================================================
   RENDER PROJECTS
===================================================== */

function renderProjects() {

    const grid =
        document.getElementById("projectsGrid");


    grid.innerHTML = "";


    projects.forEach(project => {

        const data =
            project[currentLanguage];


        const card =
            document.createElement("article");


        card.className =
            "project-card";


        card.innerHTML = `

            <div class="project-number">
                ${String(project.id).padStart(2, "0")}
            </div>

            <div class="project-label">
                ${
                    currentLanguage === "fr"
                        ? "PROJET"
                        : "مشروع"
                }
            </div>

            <div class="project-image">

                <div class="project-visual">
                    ${project.icon}
                </div>

            </div>

            <h2 class="project-title">
                ${data.title}
            </h2>

            <p class="project-description">
                ${data.description}
            </p>

            <div class="project-tags">

                ${data.tags.map(tag => `
                    <span class="tag">
                        ⚙ ${tag}
                    </span>
                `).join("")}

            </div>

            <button
                class="project-open"
                onclick="openProjectDetails(${project.id})">

                ${
                    currentLanguage === "fr"
                        ? "Voir le projet"
                        : "عرض المشروع"
                }

                →
            </button>

        `;


        grid.appendChild(card);

    });

}


/* =====================================================
   PROJECT DETAILS
===================================================== */

function openProjectDetails(id) {

    // 🔒 Vérification de l'autorisation
    if (!projectsAuthorized) {
        showProjectWaitingMessage();
        return;
    }

    const project = projects.find(p => p.id === id);

    if (!project) return;

    const data = project[currentLanguage];

    const details = document.getElementById("projectDetails");

    // =====================================================
    // TITRE + DESCRIPTION
    // =====================================================

    details.innerHTML = `

        <div class="detail-image">
            ${project.icon}
        </div>

        <h1 class="detail-title">
            ${data.title}
        </h1>

        <p class="detail-description">
            ${data.description}
        </p>


        <!-- =================================================
             TAGS
        ================================================== -->

        <div class="project-tags">

            ${
                data.tags
                    ? data.tags.map(tag => `
                        <span class="project-tag">
                            ${tag}
                        </span>
                    `).join("")
                    : ""
            }

        </div>


        <div class="detail-columns">


            <!-- =================================================
                 MATÉRIEL
            ================================================== -->

            <div class="detail-box">

                <h3>
                    ${
                        currentLanguage === "fr"
                            ? "🧰 Matériel nécessaire"
                            : "🧰 المعدات اللازمة"
                    }
                </h3>

                <ul>

                    ${
                        data.material
                            ? data.material.map(item => `
                                <li>${item}</li>
                            `).join("")
                            : ""
                    }

                </ul>

            </div>


            <!-- =================================================
                 DÉTAIL DES COMPOSANTS
            ================================================== -->

            ${
                data.componentsDetails
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🔧 Rôle de chaque composant"
                                    : "🔧 دور كل مكوّن"
                            }
                        </h3>

                        <div class="component-details">

                            ${
                                data.componentsDetails.map(component => `

                                    <div class="component-item">

                                        <h4>
                                            ${component.name}
                                        </h4>

                                        <p>
                                            ${component.explanation}
                                        </p>

                                    </div>

                                `).join("")
                            }

                        </div>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 PRINCIPE DE FONCTIONNEMENT
            ================================================== -->

            ${
                data.principle
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "⚙️ Principe de fonctionnement"
                                    : "⚙️ مبدأ العمل"
                            }
                        </h3>

                        <p>
                            ${data.principle}
                        </p>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 MONTAGE MÉCANIQUE
            ================================================== -->

            ${
                data.mechanicalAssembly
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🔩 Montage mécanique"
                                    : "🔩 التركيب الميكانيكي"
                            }
                        </h3>

                        <p>
                            ${data.mechanicalAssembly}
                        </p>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 ASSEMBLAGE ÉLECTRIQUE
            ================================================== -->

            ${
                data.electricalAssembly
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "⚡ Assemblage électrique"
                                    : "⚡ التركيب الكهربائي"
                            }
                        </h3>

                        <p>
                            ${data.electricalAssembly}
                        </p>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 CÂBLAGE
            ================================================== -->

            <div class="detail-box">

                <h3>
                    ${
                        currentLanguage === "fr"
                            ? "🔌 Câblage"
                            : "🔌 التوصيلات"
                    }
                </h3>

                <p>
                    ${data.wiring}
                </p>

            </div>


            <!-- =================================================
                 DÉTAIL DU CÂBLAGE
            ================================================== -->

            ${
                data.wiringDetails
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🔌 Schéma détaillé des connexions"
                                    : "🔌 شرح مفصل للتوصيلات"
                            }
                        </h3>

                        <ol>

                            ${
                                data.wiringDetails.map((wire, index) => `
                                    <li>
                                        <strong>
                                            ${index + 1}.
                                        </strong>
                                        ${wire}
                                    </li>
                                `).join("")
                            }

                        </ol>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 ALGORITHME
            ================================================== -->

            ${
                data.algorithm
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🧠 Algorithme"
                                    : "🧠 الخوارزمية"
                            }
                        </h3>

                        <p>
                            ${data.algorithm}
                        </p>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 PROGRAMMATION
            ================================================== -->

            ${
                data.programming
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "💻 Programmation"
                                    : "💻 البرمجة"
                            }
                        </h3>

                        <p>
                            ${data.programming}
                        </p>

                    </div>

                    `
                    : `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "💻 Programmation"
                                    : "💻 البرمجة"
                            }
                        </h3>

                        <p>
                            ${
                                currentLanguage === "fr"
                                    ? "Programmez la carte pour contrôler les capteurs, les moteurs et les différents composants du système."
                                    : "قم ببرمجة البطاقة للتحكم في الحساسات والمحركات ومختلف مكونات النظام."
                            }
                        </p>

                    </div>

                `
            }


            <!-- =================================================
                 ÉTAPES
            ================================================== -->

            <div class="detail-box">

                <h3>
                    ${
                        currentLanguage === "fr"
                            ? "📋 Étapes de réalisation"
                            : "📋 مراحل الإنجاز"
                    }
                </h3>

                <ol>

                    ${
                        data.steps
                            ? data.steps.map((step, index) => `
                                <li>
                                    <strong>
                                        ${index + 1}.
                                    </strong>
                                    ${step}
                                </li>
                            `).join("")
                            : ""
                    }

                </ol>

            </div>


            <!-- =================================================
                 TEST
            ================================================== -->

            ${
                data.testing
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🧪 Tests du projet"
                                    : "🧪 اختبار المشروع"
                            }
                        </h3>

                        <p>
                            ${data.testing}
                        </p>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 CALIBRATION
            ================================================== -->

            ${
                data.calibration
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🎯 Calibration et réglages"
                                    : "🎯 المعايرة والإعدادات"
                            }
                        </h3>

                        <p>
                            ${data.calibration}
                        </p>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 PROBLÈMES / SOLUTIONS
            ================================================== -->

            ${
                data.commonProblems
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🛠️ Problèmes fréquents et solutions"
                                    : "🛠️ المشاكل الشائعة والحلول"
                            }
                        </h3>

                        <div class="common-problems">

                            ${
                                data.commonProblems.map(item => `

                                    <div class="problem-item">

                                        <h4>
                                            ❌ ${item.problem}
                                        </h4>

                                        <p>
                                            ✅ ${item.solution}
                                        </p>

                                    </div>

                                `).join("")
                            }

                        </div>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 SÉCURITÉ
            ================================================== -->

            ${
                data.safety
                    ? `

                    <div class="detail-box safety-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "⚠️ Sécurité"
                                    : "⚠️ السلامة"
                            }
                        </h3>

                        <p>
                            ${data.safety}
                        </p>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 AMÉLIORATIONS
            ================================================== -->

            ${
                data.improvements
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🚀 Améliorations possibles"
                                    : "🚀 تطوير المشروع"
                            }
                        </h3>

                        <ul>

                            ${
                                data.improvements.map(improvement => `
                                    <li>
                                        ${improvement}
                                    </li>
                                `).join("")
                            }

                        </ul>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 OBJECTIF PÉDAGOGIQUE
            ================================================== -->

            ${
                data.educational
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🎓 Objectif pédagogique"
                                    : "🎓 الهدف التعليمي"
                            }
                        </h3>

                        <p>
                            ${data.educational}
                        </p>

                    </div>

                    `
                    : ""
            }


            <!-- =================================================
                 CONCLUSION
            ================================================== -->

            ${
                data.conclusion
                    ? `

                    <div class="detail-box">

                        <h3>
                            ${
                                currentLanguage === "fr"
                                    ? "🏁 Conclusion"
                                    : "🏁 الخلاصة"
                            }
                        </h3>

                        <p>
                            ${data.conclusion}
                        </p>

                    </div>

                    `
                    : ""
            }
<!-- =================================================
     🤖 AI ASSISTANT
================================================== -->

<div class="project-ai-assistant">

    <div class="project-ai-header">

        <div class="project-ai-icon">
            🤖
        </div>

        <div>

            <h3>
                ${
                    currentLanguage === "fr"
                        ? "Assistant IA du projet"
                        : "مساعد الذكاء الاصطناعي للمشروع"
                }
            </h3>

            <p class="project-ai-subtitle">
                ${
                    currentLanguage === "fr"
                        ? "Posez vos questions sur ce projet."
                        : "اطرح أسئلتك حول هذا المشروع."
                }
            </p>

        </div>

    </div>


    <div class="project-ai-chat">

        <div
            id="projectAiMessages"
            class="project-ai-messages"
        >

            <div class="project-ai-message ai">

                ${
                    currentLanguage === "fr"
                        ? "👋 Bonjour ! Je suis votre assistant IA. Posez-moi une question sur ce projet."
                        : "👋 مرحباً! أنا مساعد الذكاء الاصطناعي. اسألني عن أي شيء يتعلق بهذا المشروع."
                }

            </div>

        </div>


        <div class="project-ai-input-area">

            <input
                id="projectAiInput"
                class="project-ai-input"
                type="text"
                placeholder="${
                    currentLanguage === "fr"
                        ? "Posez votre question..."
                        : "اكتب سؤالك هنا..."
                }"
                onkeydown="
                    if(event.key === 'Enter') {
                        askProjectAI();
                    }
                "
            >

            <button
                id="projectAiSend"
                class="project-ai-send"
                onclick="askProjectAI()"
            >

                ${
                    currentLanguage === "fr"
                        ? "🤖 Demander"
                        : "🤖 اسأل AI"
                }

            </button>

        </div>

    </div>

</div>
        </div>

    `;

currentAIProject = project;
    // =====================================================
    // OUVRIR LA FENÊTRE
    // =====================================================

    document
        .getElementById("projectModal")
        .classList.add("show");
}


function closeProjectDetails() {

    document
        .getElementById("projectModal")
        .classList.remove("show");

}


/* =====================================================
   LANGUAGE
===================================================== */

function setLanguage(language) {

    currentLanguage = language;

    localStorage.setItem(
        "language",
        language
    );


    document.documentElement.lang =
        language;


    if (language === "ar") {

        document.body.classList.add("arabic");

    } else {

        document.body.classList.remove("arabic");

    }


    document
        .querySelectorAll("[data-fr]")
        .forEach(element => {

            element.textContent =
                element.dataset[language];

        });


    document
        .querySelectorAll("input")
        .forEach(input => {

            if (language === "ar") {

                if (input.id === "nom")
                    input.placeholder = "اللقب";

                if (input.id === "prenom")
                    input.placeholder = "الاسم";

                if (input.id === "contact")
                    input.placeholder = "البريد الإلكتروني أو الهاتف";

            } else {

                if (input.id === "nom")
                    input.placeholder = "Votre nom";

                if (input.id === "prenom")
                    input.placeholder = "Votre prénom";

                if (input.id === "contact")
                    input.placeholder = "exemple@domain.com";

            }

        });


    document
        .querySelectorAll("option[data-fr]")
        .forEach(option => {

            option.textContent =
                option.dataset[language];

        });


    document
        .getElementById("frBtn")
        .classList.toggle(
            "active",
            language === "fr"
        );


    document
        .getElementById("arBtn")
        .classList.toggle(
            "active",
            language === "ar"
        );


    renderProjects();


    const detailModal =
        document.getElementById("projectModal");


    if (detailModal.classList.contains("show")) {

        closeProjectDetails();

    }

}


/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener("click", function (event) {

    const studentModal =
        document.getElementById("studentModal");

    const projectModal =
        document.getElementById("projectModal");


    if (
        event.target === studentModal
    ) {

        closeStudentForm();

    }


    if (
        event.target === projectModal
    ) {

        closeProjectDetails();

    }

});
function showProjectWaitingMessage() {

    const oldMessage =
        document.querySelector(".project-waiting-message");

    if (oldMessage) oldMessage.remove();

    const message = document.createElement("div");

    message.className = "project-waiting-message";

    message.innerHTML = `
        <div class="project-waiting-box">

            <div class="project-waiting-icon">⏳</div>

            <h2>
                ${
                    currentLanguage === "fr"
                        ? "Demande en attente"
                        : "طلبك قيد الانتظار"
                }
            </h2>

            <p>
                ${
                    currentLanguage === "fr"
                        ? `
                            Votre formulaire a bien été envoyé.
                            <br><br>
                            Veuillez attendre la réponse
                            du propriétaire du site.
                            <br><br>
                            Les 11 projets resteront verrouillés
                            jusqu'à votre autorisation.
                          `
                        : `
                            تم إرسال معلوماتك بنجاح.
                            <br><br>
                            يرجى انتظار إجابة صاحب الموقع.
                            <br><br>
                            ستبقى المشاريع الـ11 مغلقة
                            حتى تتم الموافقة على طلبك.
                          `
                }
            </p>

            <button
                class="project-waiting-check"
                onclick="checkApprovalAgain()"
            >
                ${
                    currentLanguage === "fr"
                        ? "🔄 Vérifier ma demande"
                        : "🔄 التحقق من حالة الطلب"
                }
            </button>

            <button
                class="project-waiting-close"
                onclick="closeProjectWaitingMessage()"
            >
                ${
                    currentLanguage === "fr"
                        ? "Fermer"
                        : "إغلاق"
                }
            </button>

        </div>
    `;

    document.body.appendChild(message);
}


function closeProjectWaitingMessage() {

    const message =
        document.querySelector(".project-waiting-message");

    if (message) {
        message.remove();
    }
}
async function checkApprovalAgain() {

    const { data, error } =
        await supabaseClient.rpc(
            "get_my_request_status"
        );

    if (error) {

        console.error("Supabase error:", error);

        alert(
            currentLanguage === "fr"
                ? "Erreur de connexion."
                : "حدث خطأ في الاتصال."
        );

        return;
    }

    if (data === "approved") {

        projectsAuthorized = true;

        closeProjectWaitingMessage();

        openProjects();

        return;
    }

    if (data === "rejected") {

        projectsAuthorized = false;

        alert(
            currentLanguage === "fr"
                ? "Votre demande a été refusée."
                : "تم رفض طلبك."
        );

        return;
    }

    if (data === "pending") {

        projectsAuthorized = false;

        alert(
            currentLanguage === "fr"
                ? "⏳ Votre demande est toujours en attente."
                : "⏳ طلبك مازال في انتظار موافقة صاحب الموقع."
        );

        return;
    }

    if (data === "not_found") {

        openStudentForm();

        return;
    }
}
/* =====================================================
   LOGIN
===================================================== */

function openLoginForm() {

    closeStudentForm();

    const loginModal = document.getElementById("loginModal");

    if (loginModal) {
        loginModal.classList.add("show");
    }
}


function closeLoginForm() {

    const loginModal = document.getElementById("loginModal");

    if (loginModal) {
        loginModal.classList.remove("show");
    }
}


/* تسجيل الدخول */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        if (!email || !password) {

            alert(
                currentLanguage === "fr"
                    ? "Veuillez remplir tous les champs."
                    : "يرجى تعمير جميع الخانات."
            );

            return;
        }


        /* Connexion Supabase */

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });


        /* Erreur de connexion */

        if (error) {

            console.error("Login error:", error);

            alert(
                currentLanguage === "fr"
                    ? "Email ou mot de passe incorrect."
                    : "البريد الإلكتروني أو كلمة المرور غير صحيحة."
            );

            return;
        }


        /* Vérifier la demande de l'étudiant */

        const { data: status, error: statusError } =
            await supabaseClient.rpc(
                "get_my_request_status"
            );


   if (statusError) {

    console.error(
        "Status error:",
        statusError
    );

    alert(
        currentLanguage === "fr"
            ? "Erreur Supabase : " + statusError.message
            : "خطأ Supabase: " + statusError.message
    );

    return;
}


        /* Demande approuvée */

        if (status === "approved") {

            projectsAuthorized = true;

            closeLoginForm();

            closeProjectWaitingMessage();

            openProjects();

            return;
        }


        /* Demande en attente */

        if (status === "pending") {

            projectsAuthorized = false;

            closeLoginForm();

            showProjectWaitingMessage();

            return;
        }


        /* Demande refusée */

        if (status === "rejected") {

            projectsAuthorized = false;

            alert(
                currentLanguage === "fr"
                    ? "Votre demande a été refusée."
                    : "تم رفض طلبك."
            );

            return;
        }


        /* Aucun formulaire trouvé */

        if (status === "not_found") {

            alert(
                currentLanguage === "fr"
                    ? "Aucune demande étudiant n'est associée à ce compte."
                    : "لا يوجد طلب طالب مرتبط بهذا الحساب."
            );

            return;
        }

    });

});
/* =====================================================
   RESTORE LOGIN SESSION
===================================================== */

document.addEventListener("DOMContentLoaded", async function () {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session) {
        return;
    }

    console.log("Student session restored:", session.user.email);


    /* Vérifier le statut de la demande */

    const { data: status, error } =
        await supabaseClient.rpc(
            "get_my_request_status"
        );

    if (error) {
        console.error(
            "Session status error:",
            error
        );
        return;
    }


    /* Autorisé */

    if (status === "approved") {

        projectsAuthorized = true;

        return;
    }


    /* En attente */

    if (status === "pending") {

        projectsAuthorized = false;

        return;
    }


    /* Refusé */

    if (status === "rejected") {

        projectsAuthorized = false;

        return;
    }

});
async function askProjectAI() {

    const input = document.getElementById("projectAiInput");
    const messages = document.getElementById("projectAiMessages");
    const button = document.getElementById("projectAiSend");

    if (!input || !messages || !button) return;

    const question = input.value.trim();

    if (!question) return;

    if (!currentAIProject) {
        alert(
            currentLanguage === "fr"
                ? "Aucun projet sélectionné."
                : "لم يتم اختيار أي مشروع."
        );
        return;
    }

    // Message de l'étudiant
    const userMessage = document.createElement("div");
    userMessage.className = "project-ai-message user";
    userMessage.textContent = question;

    messages.appendChild(userMessage);

    input.value = "";
    button.disabled = true;

    // Message de chargement
    const loadingMessage = document.createElement("div");
    loadingMessage.className =
        "project-ai-message ai project-ai-loading";

    loadingMessage.textContent =
        currentLanguage === "fr"
            ? "🤖 Réflexion..."
            : "🤖 جاري التفكير...";

    messages.appendChild(loadingMessage);
    messages.scrollTop = messages.scrollHeight;

    try {

        const { data, error } =
            await supabaseClient.functions.invoke(
                "project-ai",
                {
                    body: {
                        message: question,
                        project:
                            currentLanguage === "fr"
                                ? currentAIProject.fr.title
                                : currentAIProject.ar.title
                    }
                }
            );

        loadingMessage.remove();
if (error) {

    console.error("AI Function error:", error);
    console.error("Error message:", error.message);
    console.error("Error context:", error.context);

    let details = "";

    try {
        if (error.context) {
            details = await error.context.text();
        }
    } catch (e) {
        details = "Could not read error response.";
    }

    console.error("Server response:", details);

    alert(
        "AI ERROR\n\n" +
        "Message: " + (error.message || "Unknown") +
        "\n\nServer:\n" + details
    );

    loadingMessage.remove();

    return;
}if (error) {

    console.error("AI Function error:", error);
    console.error("Error message:", error.message);
    console.error("Error context:", error.context);

    let details = "";

    try {
        if (error.context) {
            details = await error.context.text();
        }
    } catch (e) {
        details = "Could not read error response.";
    }

    console.error("Server response:", details);

    alert(
        "AI ERROR\n\n" +
        "Message: " + (error.message || "Unknown") +
        "\n\nServer:\n" + details
    );

    loadingMessage.remove();

    return;
}

        const aiMessage = document.createElement("div");
        aiMessage.className = "project-ai-message ai";

        aiMessage.textContent =
            data?.answer ||
            (
                currentLanguage === "fr"
                    ? "Je n'ai pas reçu de réponse."
                    : "لم أتلقَّ إجابة."
            );

        messages.appendChild(aiMessage);

        messages.scrollTop = messages.scrollHeight;

    } catch (error) {

        console.error("AI error:", error);

        loadingMessage.remove();

        const aiMessage = document.createElement("div");
        aiMessage.className = "project-ai-message ai";

        aiMessage.textContent =
            currentLanguage === "fr"
                ? "❌ Impossible de contacter l'IA."
                : "❌ تعذر الاتصال بالذكاء الاصطناعي.";

        messages.appendChild(aiMessage);

    } finally {

        button.disabled = false;

    }
}