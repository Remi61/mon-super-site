const config = {
    navigation: [
        { title: "Accueil", link: "#" },
        { title: "A Propos", link: "#apropos" },
        { title: "Procédures", link: "#procedures" },
        { title: "Parcours", link: "#parcours" },
        { title: "Compétences", link: "#competences" },
        { title: "Veille", link: "#veille" },
        { title: "Contact", link: "#contact" }
    ],

    profile: {
        githubUser: "remi-christophe", 
        githubRepo: "Portfolio", 
        avatar: "assets/img/ma-photo.jpg",
        name: "REMI.",
        typewriterText: "Admin Sys & Réseau | Étudiant BTS SIO",
        bio: "Étudiant en 2ème année de BTS SIO à CaenSup Sainte-Ursule. Spécialisé dans l'infrastructure réseau Cisco, le déploiement de serveurs et la maintenance système.",
        status: "Disponible pour alternance",
        emailEncoded: "cmVtaWNocmlzdG9waGUzQGdtYWlsLmNvbQ=="
    },

    social: { 
        github: "https://github.com/Remi61", 
        linkedin: "https://www.linkedin.com/in/remi-christophe-91576a224/" 
    },
    skills: [ "Cisco IOS", "Linux Debian", "Windows Server", "Active Directory", "VMware" ],

    projects: [],

    procedures: [
        // --- BATCH 1 ---
       { 
            icon: "🐦",
            title: "Apache et DNS", 
            description: "installation d'un serveur Apache et DNS.", 
            path: "apachedns.pdf", 
            tags: ["LAMP", "DNS", "Apache"] 
        },
        { 
            icon: "📂",
            title: "Procédure Samba", 
            description: "Pré-requis : un poste client Windows 10 et un serveur Debian 12.5. Configuration du partage de fichiers.", 
            path: "procedure_samba.pdf", 
            tags: ["Linux", "Partage", "Samba"] 
        },
        { 
            icon: "🌍",
            title: "DNS Primaire Bind9", 
            description: "Mise en place d'une résolution directe et tests de fonctionnalité sur Linux Debian 12.5.", 
            path: "dns_bind9.pdf", 
            tags: ["Réseau", "DNS", "Linux"] 
        },
        { 
            icon: "🏗️",
            title: "Architecture 3-tiers", 
            description: "Déploiement de deux VMs (Web Apache2/PHP8 et BDD) sur Debian 12 ou supérieure.", 
            path: "archi_3tiers.pdf", 
            tags: ["Architecture", "Web", "BDD"] 
        },
        { 
            icon: "⚖️",
            title: "Load Balancing HAProxy", 
            description: "Schéma d'architecture, configuration réseau et répartition de charge sur les serveurs.", 
            path: "haproxy.pdf", 
            tags: ["Réseau", "HaProxy", "Web"] 
        },
        { 
            icon: "📒",
            title: "Procédure OpenLDAP", 
            description: "Installation, paramétrage serveur/client et interface graphique pour la gestion de l'annuaire.", 
            path: "openldap.pdf", 
            tags: ["Annuaire", "LDAP", "Linux"] 
        },
        { 
            icon: "🦑",
            title: "Procédure Proxy Squid", 
            description: "Installation et configuration d'un serveur Proxy Squid pour la gestion et le filtrage du trafic.", 
            path: "proxy_squid.pdf", 
            tags: ["Sécurité", "Proxy", "Réseau"] 
        },
        { 
            icon: "🔒",
            title: "Serveur Apache HTTPS", 
            description: "Génération d'un certificat auto-signé OpenSSL et configuration d'un VirtualHost sécurisé.", 
            path: "apache_https.pdf", 
            tags: ["Web", "Sécurité", "SSL/TLS"] 
        },
        { 
            icon: "📥",
            title: "Procédure FTPS", 
            description: "Installation des paquets et sécurisation du protocole de transfert de fichiers par chiffrement.", 
            path: "procedure_ftps.pdf", 
            tags: ["Transfert", "Sécurité", "FTP"] 
        },
        { 
            icon: "🐧",
            title: "Installation Linux Debian 12.5", 
            description: "Documentation pas à pas : sélection de la langue, partitionnement et configuration initiale.", 
            path: "install_debian.pdf", 
            tags: ["OS", "Debian", "Installation"] 
        },

        // --- BATCH 2 ---
        { 
            icon: "👥",
            title: "Gestion des Comptes (AGDLP)", 
            description: "Préparation de l'environnement, création des comptes et application de la méthode AGDLP sous Windows Server.", 
            path: "gestion_agdlp.pdf", 
            tags: ["Windows Server", "AD", "AGDLP"] 
        },
        { 
            icon: "📧",
            title: "Documentation Postfix", 
            description: "Configuration des IP, du serveur DNS et mise en place du service de messagerie électronique.", 
            path: "doc_postfix.pdf", 
            tags: ["Linux", "Mail", "Postfix"] 
        },
        { 
            icon: "🏰",
            title: "SAMBA Active Directory", 
            description: "Installation et configuration de NTP, provisionnement du Contrôleur de Domaine (DC).", 
            path: "samba_ad.pdf", 
            tags: ["Linux", "Samba", "AD"] 
        },
        { 
            icon: "📦",
            title: "Création VM VirtualBox", 
            description: "Guide de création d'une machine virtuelle (Debian) sur le disque de stockage.", 
            path: "creation_vm.pdf", 
            tags: ["Virtualisation", "VirtualBox", "Tuto"] 
        },
        { 
            icon: "🛠️",
            title: "Installation DNS Bind9", 
            description: "Installation du service, mise à jour des paquets et vérification de l'état du service.", 
            path: "install_dns_bind9.pdf", 
            tags: ["Linux", "DNS", "Installation"] 
        },
        { 
            icon: "💾",
            title: "Gestion du RAID Logiciel", 
            description: "Installation du système d'exploitation en RAID 1 et configuration du RAID 5 sous Linux.", 
            path: "gestion_raid.pdf", 
            tags: ["Linux", "Stockage", "RAID"] 
        },
        { 
            icon: "📤",
            title: "Le Serveur ProFTP", 
            description: "Installation et configuration du serveur FTP ProFTPD.", 
            path: "serveur_proftp.pdf", 
            tags: ["Linux", "FTP", "ProFTPD"] 
        },
        { 
            icon: "🔄",
            title: "DNS Secondaire Bind9", 
            description: "Mise en place d'un serveur DNS secondaire pour la redondance sous Debian 12.5.", 
            path: "dns_secondaire.pdf", 
            tags: ["Linux", "DNS", "Redondance"] 
        },
        { 
            icon: "⚡",
            title: "DNS Dynamique", 
            description: "Procédure pour mettre en place la mise à jour dynamique des zones DNS.", 
            path: "dns_dynamique.pdf", 
            tags: ["Linux", "DNS", "DDNS"] 
        },

        // --- BATCH 3 ---
        { 
            icon: "🌐", // MODIFICATION ICI : Émoji web universel
            title: "Installation Service Web Apache 2", 
            description: "Comment mettre en place un Service Web Apache 2 sur une distribution Debian 12.5.", 
            path: "install_apache2.pdf", 
            tags: ["Linux", "Apache", "Web"] 
        },
        { 
            icon: "🏷️",
            title: "Configuration d'un serveur DHCP", 
            description: "Comment mettre en place un serveur DHCP sur une machine Debian 12.", 
            path: "config_dhcp.pdf", 
            tags: ["Linux", "DHCP", "Réseau"] 
        },
		// --- BATCH 4 (Nouveautés) ---
        { 
            icon: "💾",
            title: "RAID Logiciel (Debian 13)", 
            description: "Mise en place de RAID 1 pour le système et RAID 5 pour les données sous Debian 13 avec mdadm.", 
            path: "raid.pdf", 
            tags: ["Linux", "Stockage", "RAID"] 
        },
        { 
            icon: "🚀",
            title: "Routage Dynamique RIPng", 
            description: "Configuration du routage dynamique IPv6 (RIPng) sur des routeurs Cisco et analyse des tables.", 
            path: "routagedynamique.pdf", 
            tags: ["Cisco", "IPv6", "Réseau"] 
        },
        { 
            icon: "🕵️",
            title: "Attaque MITM SSH", 
            description: "Analyse d'une interception de mots de passe via une attaque Man-In-The-Middle et déploiement de contre-mesures.", 
            path: "attaquemitm.pdf", 
            tags: ["Sécurité", "SSH", "Kali"] 
        },
        { 
            icon: "🛡️",
            title: "DHCP Snooping", 
            description: "Protection contre les serveurs DHCP malveillants via la configuration du DHCP Snooping sur switchs Cisco.", 
            path: "dhcpsnooping.pdf", 
            tags: ["Cisco", "Sécurité", "Réseau"] 
        },
        { 
            icon: "🤖",
            title: "Sauvegarde Auto Python", 
            description: "Automatisation de la sauvegarde des configurations switchs Cisco via un script Python et la bibliothèque Netmiko.", 
            path: "sauvegardeauto.pdf", 
            tags: ["Python", "Cisco", "Automatisation"] 
        }
		
    ],

    experiences: [
        {
            date: "Mai 2025 - Juin 2025",
            role: "Stage Admin Réseau",
            company: "Seqens (Couternes)",
            description: "Configuration de switchs, réalisation de schémas réseau de l'entreprise et dépannage de PC."
        },
        {
            date: "2023 - 2024 (8 sem.)",
            role: "Stage Technicien Maintenance",
            company: "La Poste PIC (Colombelles)",
            description: "Maintenance informatique, démontage/préparation de PC, brassage réseau et configuration d'enregistreurs vidéo."
        },
        {
            date: "Jan 2023 - Fév 2023",
            role: "Stage Support Informatique",
            company: "Hôpital de Falaise",
            description: "Dépannage de Switch, préparation de téléphones portables, dépannage de PC."
        },
        {
            date: "Juin 2022 - Juil 2022",
            role: "Stage Technicien",
            company: "Sasic (Putanges)",
            description: "Installation serveur Linux, clonage de disques durs, préparation de PC."
        },
        {
            date: "2022 - 2023",
            role: "Stage Service Informatique",
            company: "Mairie de Falaise",
            description: "Installation Windows 10, brassage de câbles, remplacement disques durs."
        }
    ],

    competences: [
        { icon: "🌐", name: "Réseau", details: [ "Modèle OSI & TCP/IP", "VLAN / Trunking / STP", "Routage statique & OSPF", "ACLs & NAT" ] },
        { icon: "💻", name: "Système", details: [ "Windows Server 2019/2022", "Linux Debian/Ubuntu", "Virtualisation (ESXi)", "PowerShell & Bash" ] },
        { icon: "🎓", name: "Diplômes", details: [ "BTS SIO (En cours)", "BAC Pro RISC (Mention AB)", "Brevet des collèges" ] },
        { icon: "🗣️", name: "Langues", details: [ "Français (Natif)", "Anglais (Technique)", "Espagnol (Scolaire)" ] }
    ],

    certifications: [
        { name: "BAC Pro RISC", issuer: "Lycée Charles Tellier" },
        { name: "BAFA", issuer: "Jeunesse & Sports" },
        { name: "Permis B", issuer: "Préfecture" }
    ]

};












