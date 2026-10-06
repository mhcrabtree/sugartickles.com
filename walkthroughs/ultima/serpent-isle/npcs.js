// Character tooltips for the Serpent Isle walkthrough.
// Key = the exact text inside <span class="npc">. Value = [who they are, where to find them].
window.ST_NPCS = {
  // Companions
  'Shamino': ['Companion, the ranger', 'Rejoins you on the shore south of the landing; after the Mountains of Freedom he waits in the woods west of Moonshade'],
  'Dupre': ['Companion, the knight', 'Monitor: the crypts under the crematorium, at the funeral. After the Mountains of Freedom: the Blue Boar Inn in Moonshade'],
  'Iolo': ['Companion, the bard', 'Monitor: the jail in the northeast corner of town. After the Mountains of Freedom: Gustacio\'s manor in Moonshade'],
  'Boydon': ['Optional companion, a stitched-together man', 'Erstam\'s island, once you bring his parts to life'],
  'Stefano': ['Thief, optional companion', 'Mountains of Freedom (prison maze); later in Moonshade'],
  'Petra': ['Moonshade servant trapped in an automaton\'s body', 'Moonshade'],

  // Monitor
  'Lord Marsten': ['Lord of Monitor (secretly the traitor)', 'Monitor: the crypts under the crematorium at first, then his manor'],
  'Spektor': ['Monitor\'s treasurer; collects fines', 'Monitor'],
  'Caladin': ['Knight of Monitor, Bear Command leader', 'Monitor'],
  'Brendann': ['Knight of Monitor, Wolf Command leader', 'Monitor'],
  'Harnna': ['Monitor\'s healer, Cantra\'s mother', 'Monitor: the healer\'s shop'],
  'Cantra': ['Harnna\'s daughter', 'Monitor, until she goes missing during the banquet'],
  'Shmed': ['Runs the Knight\'s Test', 'The Knight\'s Test site north of Monitor'],
  'Cellia': ['Furrier; makes your Cloak of Knighthood', 'Monitor: the furrier\'s shop'],
  'Lucilla': ['Barkeep of the Slashing Sword', 'Monitor: the Slashing Sword tavern'],
  'Lydia': ['Tattoo artist (poisons your knight\'s tattoo)', 'Monitor: her tattoo shop'],
  'Krayg': ['Provisioner', 'Monitor: the provisioner\'s shop'],
  'Simon': ['Monitor\'s innkeeper, secretly a goblin', 'Monitor: the inn'],
  'Renfry': ['Undertaker; pays for bodies', 'Monitor: the crematorium'],
  'Pomdirgun': ['King of the goblins', 'The goblin village, past the Knight\'s Forest'],
  'Johnson': ['Captured knight of Monitor', 'The goblin village prison'],

  // Fawn
  'Delphynia': ['Fawn\'s healer and herbalist; sells varo leaves', 'Fawn: the healer\'s shop'],
  'Ruggs': ['Disfigured man in love with Delphynia', 'Fawn: by the bridge into town'],
  'Scots': ['Fellowship cartographer; gives you a map', 'The Fellowship camp just outside Fawn'],
  'Alyssand': ['Fawn resident working against the city\'s leaders', 'Fawn'],
  'Kalen': ['Assassin sent by Batlin', 'Ambushes you in Fawn'],
  'Zulith': ['Chancellor to Lady Yelinda', 'Fawn: Lady Yelinda\'s palace (and tailing you around town)'],
  'Jorvin': ['Member of Fawn\'s guard', 'Fawn'],
  'Lady Yelinda': ['Ruler of Fawn', 'Fawn: her palace. After the cataclysm she flees into the Swamp of Gorlab'],
  'Voldin': ['One of Fawn\'s Great Captains; rigs the Oracle', 'Fawn: the Temple of Beauty (downstairs at the Oracle\'s controls at night)'],
  'Kylista': ['Priestess of Beauty', 'Fawn: the Temple of Beauty; later the Fawn jail'],

  // Inn of the Sleeping Bull
  'Devra': ['Owner of the Inn of the Sleeping Bull; buys gems', 'The Inn of the Sleeping Bull, by Bull Tower'],
  'Argus': ['Regular at the inn', 'The Inn of the Sleeping Bull'],
  'Captain Hawk': ['Ship captain who can sail you around the isle', 'Locked in Bull Tower next to the Sleeping Bull until his fine is paid; later aboard his ship'],
  'Selina': ['Friendly stranger offering treasure (works for Batlin)', 'The Inn of the Sleeping Bull'],

  // Moonshade
  'Rotoluncia': ['The Red Sorceress, a Moonshade mage', 'Moonshade: her manor'],
  'Fedabiblio': ['Master of the Seminarium; trades you a spellbook', 'Moonshade: the Seminarium'],
  'Flindo': ['Moonshade merchant who can get you an audience', 'Moonshade'],
  'Filbercio': ['MageLord of Moonshade', 'Moonshade: the MageLord\'s palace'],
  'Pothos': ['Apothecary', 'Moonshade: the apothecary shop'],
  'Bucia': ['Shopkeeper', 'Moonshade: her shop'],
  'Mosh': ['The rat woman; trades a magic harp for fish', 'Moonshade'],
  'Frigidazzi': ['Moonshade mage (sets up the Mountains of Freedom trap)', 'Moonshade: her villa'],
  'Gustacio': ['Moonshade mage studying the storms', 'Moonshade: his manor; his tower is on the plains north of town'],
  'Ale': ['A parrot who is really Edrin, struck by lightning', 'Moonshade, near Gustacio\'s experiment'],
  'Julia': ['Moonshade ranger; lends the key to the southern caves', 'Moonshade'],
  'Torrissio': ['Moonshade mage; teaches Create Soul Prism', 'Moonshade: his manor'],
  'Ducio': ['Artisan; supplies worm gems', 'Moonshade: his workshop'],
  'Andrio': ['One of the few Moonshade survivors', 'Moonshade, after Shamino the Anarch\'s rampage'],
  'Freli': ['One of the few Moonshade survivors', 'Moonshade, after Shamino the Anarch\'s rampage'],
  'Mortegro': ['Moonshade\'s necromancer', 'Moonshade; later stranded on an island inside the Temple of Tolerance'],

  // Mountains of Freedom
  'Lorthondo': ['Mage who runs the Mountains of Freedom prison', 'The Mountains of Freedom'],
  'Arcadion': ['Daemon bound in a black sword', 'The Mountains of Freedom; afterward he travels with you in the sword'],

  // Erstam's island, Monk Isle
  'Erstam': ['The Mad Mage', 'His island east of Moonshade (needs the password to enter)'],
  'Vasel': ['Erstam\'s assistant', 'Erstam\'s island'],
  'Karnax': ['Xenkan monk', 'Monk Isle'],
  'Thoxa': ['Xenkan monk and messenger of the prophecies', 'Appears on the beach where you land; later in the Realm of Dreams. Lives on Monk Isle'],
  'Xenka': ['The prophetess the monks follow', 'Appears near the end of the main quest'],

  // The Furnace, Realm of Dreams
  'Zhelkas': ['Gargoyle guarding the drawbridge', 'The Furnace, across the drawbridge'],
  'Lord British': ['King of Britannia, dreaming', 'The Realm of Dreams'],
  'Byrin': ['Dream figure who explains the realm', 'The Realm of Dreams: the dream version of the Sleeping Bull'],
  'Siranush': ['Mistress of the Realm of Dreams', 'The Realm of Dreams'],
  'Rabindrinath': ['Siranush\'s rival in the Realm of Dreams', 'The Realm of Dreams'],

  // Great Northern Forest, Shamino's Castle, the north
  'Draygan': ['Fellowship thug who took over the forest', 'The mining camp at the end of the road in the Great Northern Forest'],
  'Boryl': ['Draygan\'s prisoner', 'Draygan\'s mining camp, Great Northern Forest'],
  'Morghrim': ['The Forest Master, a refugee from Pagan', 'Southwest part of the Great Northern Forest'],
  'Beatrix': ['Angry spirit, Shamino\'s lost love', 'Shamino\'s Castle: the hidden storeroom'],
  'Batlin': ['Former Fellowship leader, the main villain', 'Always a step ahead; you confront him at Shamino\'s Castle and beyond'],
  'Palos': ['One of Batlin\'s henchmen', 'Shamino\'s Castle; later sets a trap in Spinebreaker'],
  'Brunt': ['One of Batlin\'s henchmen', 'Spinebreaker'],
  'Gannt the Bard': ['Ghost of a murdered bard', 'The catacombs on the Passage to the North'],
  'Fitch': ['Dying trapper', 'At the far end of the Passage to the North'],
  'Hazard the Trapper': ['Trapper who massacres the Gwani', 'The Gwani village, on your return'],

  // Gwani
  'Bwundai': ['Gwani (furred people of the north)', 'On the trail to the Gwani village'],
  'Neyobi': ['Sick Gwani child', 'The Gwani caves'],
  'Baiyanda': ['Gwani healer', 'The Gwani caves'],
  'Gilwoyai': ['Gwani hunter', 'North of the Gwani village, on the way to the ice dragon'],
  'Yenani': ['Gwani leader', 'The Gwani caves'],

  // Ancient cities, temples
  'Vasculio': ['Long-dead sorcerer who robbed Moonshade\'s mages', 'Skullcrusher: his laboratory'],
  'Maleccio': ['Dead adventurer (read his journal)', 'Skullcrusher: the cage to the west'],
  'Sethys': ['Ancient prisoner who knows how to summon the Chaos Hierophant', 'The Temple of Tolerance: the southernmost prison cell'],
  'Isstanar': ['Commander of the ancient fortress', 'The Silver Seed: the north chamber']
};
