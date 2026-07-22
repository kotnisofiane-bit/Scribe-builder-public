<p align="center">
  <img src="brand/dubsar-readme-header-fr.svg" alt="DUBSAR — Gouverner le passage de l’intention à la preuve. Conserver l’autorité humaine." width="100%" />
</p>

# DUBSAR

**Gouverner le passage de l’intention à la preuve. Conserver l’autorité humaine.**

DUBSAR rend les projets logiciels construits avec des agents de code plus explicables, vérifiables et contrôlables dans la durée.

Deux voies sont proposées aujourd’hui :

| Produit | Prestation professionnelle |
|---|---|
| **DUBSAR pour Claude Code** — bêta privée contrôlée pour gouverner un projet réel pendant sa construction. | **Audit DUBSAR** — audit borné et étayé par des preuves sur la préparation au lancement ou la gouvernance des agents. |
| Sur invitation · Windows en premier | Sur demande · À distance · Lecture seule par défaut |

[Demander un accès bêta](https://dubsar.ai/fr/early-access) · [Demander un audit](https://dubsar.ai/fr/audit) · [Documentation anglaise](README.md)

---

<p align="center">
  <img src="diagrams/dubsar-architecture.svg" alt="Architecture DUBSAR : agent de code, adaptateur hôte, environnement local, Backend et Core protégés, cockpit et autorité humaine." />
</p>

---

## Pourquoi DUBSAR existe

Les agents accélèrent la production. Ils ne garantissent pas à eux seuls la continuité, la preuve ni l’autorité.

D’une session ou d’un outil à l’autre, un projet peut perdre :

- sa Mission et ses contraintes actives ;
- les décisions prises et leurs raisons ;
- le lien entre les affirmations et les preuves vérifiées ;
- les contradictions entre tickets, documentation, code et tests ;
- les Human Gates encore en attente ;
- le chemin nécessaire pour reprendre ou expliquer le projet.

DUBSAR ajoute une couche de gouvernance durable autour des agents existants :

- Mission persistante et mémoire des décisions ;
- travail borné et contrats explicites ;
- identité des sessions ;
- preuves reliées aux sources et versions ;
- contradictions et limites visibles ;
- reprise et rejeu ;
- Human Gates pour les décisions protégées.

**Les agents proposent. DUBSAR préserve et vérifie. L’humain décide.**

DUBSAR n’est pas un nouvel agent de code et ne remplace pas le développeur.

---

## Voie 1 — DUBSAR pour Claude Code

Claude Code est la première intégration. La bêta privée fonctionnelle est en cours de finalisation pour des projets extérieurs sélectionnés, avec Windows comme première cible.

Les preuves techniques internes à une et deux sessions sont acquises. L’installation et l’expérience autonome d’un utilisateur extérieur restent à valider avant toute ouverture publique de la Marketplace.

Le modèle multi-session conserve une Mission canonique tout en séparant les identités, les worktrees, les processus et les preuves de chaque session. Les conflits restent visibles et les déplacements protégés passent par une décision humaine explicite.

<p align="center">
  <img src="diagrams/dubsar-multi-session.svg" alt="Modèle multi-session gouverné par DUBSAR : Mission canonique, sessions isolées, preuves attribuables, conflits visibles et Human Gate partagé." />
</p>

Codex, Cursor et d’autres environnements font partie de la direction future. Ils ne sont pas présentés comme des intégrations disponibles aujourd’hui.

[Surfaces du produit](PRODUCT_SURFACES.md) · [État actuel](STATUS.md) · [Limites d’installation](INSTALLATION.md)

---

## Voie 2 — Audit DUBSAR

L’Audit DUBSAR est une prestation opérée par Sofiane avec DUBSAR. Il répond à l’une de ces questions :

1. **Préparation au lancement** — le produit est-il réellement prêt à être ouvert aux utilisateurs ?
2. **Gouvernance des agents** — l’équipe peut-elle expliquer et vérifier comment le projet a été construit et validé ?

L’audit examine uniquement les sources autorisées dans un mandat défini. Le rapport distingue les faits, les inférences, les preuves, les contradictions, les limites et les décisions humaines.

Selon l’environnement du client, les sources autorisées peuvent inclure GitHub, Jira, Confluence, Linear, Notion, Slack ou Google Drive. Chaque constat conserve sa provenance et les limites d’accès restent visibles dans le rapport.

Pour un audit de préparation au lancement, le verdict est **GO, GO sous conditions ou NO-GO**, accompagné de constats priorisés et d’un registre de preuves.

La prestation est disponible sur demande, réalisée à distance et en lecture seule par défaut. Aucun résultat final n’est livré sans revue humaine.

[Méthode d’audit](AUDIT.fr.md) · [Demander un audit](https://dubsar.ai/fr/audit)

---

## Une méthode, deux niveaux de maturité

```text
Produit DUBSAR pour Claude Code : bêta privée contrôlée en finalisation
Audit DUBSAR : prestation professionnelle disponible sur demande
Marketplace publique : non activée
Adaptateurs Codex / Cursor : direction future
Core privé : propriétaire et non distribué ici
```

La prestation d’audit ne présente pas la bêta comme une plateforme d’entreprise arrivée à maturité. Elle utilise DUBSAR comme système opérateur gouverné, avec les sources autorisées du projet et une validation humaine, afin de produire un résultat professionnel.

## Direction du produit

DUBSAR est conçu autour d’adaptateurs hôtes plutôt que d’un Core lié définitivement à Claude Code. Le produit à long terme reste DUBSAR lui-même : une couche de gouvernance pour les projets logiciels assistés par des agents.

L’audit est une application professionnelle de cette méthode et un moyen de l’éprouver sur des projets réels. Il ne remplace pas la trajectoire produit.

## Ce que DUBSAR ne prétend pas faire

DUBSAR ne prétend pas :

- remplacer les agents de code, les développeurs ou l’autorité technique du client ;
- permettre à un agent de valider seul son propre travail ;
- confondre une affirmation convaincante avec une preuve ;
- fusionner, publier ou déployer silencieusement ;
- certifier une conformité réglementaire ;
- garantir un code sans défaut ni vulnérabilité ;
- exposer le Core propriétaire ;
- présenter Codex ou Cursor comme des intégrations déjà disponibles.

## Frontière publique et privée

Ce dépôt constitue la surface publique de documentation et de distribution de DUBSAR. Il peut contenir la doctrine, l’architecture, des exemples bornés, les informations publiques de sécurité et d’installation, ainsi que l’adaptateur Claude Code lorsque sa publication est autorisée.

Il ne publie pas le Core propriétaire, les détails privés du Backend, les politiques internes, les journaux scellés, les données confidentielles de clients ou de testeurs, ni aucun secret ou élément de confiance.

Certains identifiants techniques utilisent encore `scribe` pour compatibilité. Ce sont des noms historiques d’implémentation, pas un second produit public.

---

## Documentation

### Pour commencer

1. [Pourquoi DUBSAR ?](WHY_DUBSAR.md)
2. [Audit DUBSAR](AUDIT.fr.md)
3. [Produit et surfaces](PRODUCT_SURFACES.md)
4. [État actuel](STATUS.md)
5. [Architecture](ARCHITECTURE.md)
6. [FAQ](FAQ.md)
7. [Feuille de route](ROADMAP.md)

### Distribution et confiance

- [Installation](INSTALLATION.md)
- [Marketplace](MARKETPLACE.md)
- [Sécurité](SECURITY.md)
- [Confidentialité](PRIVACY.md)
- [Intégrité et provenance](INTEGRITY.md)

---

## Créé par

Créé par **Sofiane Kotni**.

Site : [dubsar.ai](https://dubsar.ai/fr/) · Contact : [contact@dubsar.ai](mailto:contact@dubsar.ai)
