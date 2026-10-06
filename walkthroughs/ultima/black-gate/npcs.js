// Character tooltips for the Black Gate walkthrough.
// Key = the exact text inside <span class="npc">. Value = [who they are, where to find them].
window.ST_NPCS = {
  // Companions and royalty
  'Iolo': ['Companion, the bard', 'Trinsic: the stables, where the game begins'],
  'Shamino': ['Companion, the ranger', 'Britain: the Blue Boar tavern'],
  'Lord British': ['King of Britannia', 'Britain: the castle throne room'],
  'Chuckles': ['Court jester; plays the one-syllable game', 'Britain: Lord British\'s castle'],

  // Trinsic
  'Petre': ['Stablekeeper; sells a horse and wagon', 'Trinsic: the stables'],
  'Finnigan': ['Mayor of Trinsic', 'Trinsic: the town hall'],
  'Christopher': ['Trinsic\'s blacksmith (murder victim)', 'Trinsic: the stables'],
  'Inamo': ['Gargoyle (murder victim)', 'Trinsic: the stables'],
  'Johnson': ['Trinsic gate guard', 'Trinsic: the east gate'],
  'Gilberto': ['Night guard who was knocked out', 'Trinsic: recovering at the healer\'s'],
  'Spark': ['Christopher\'s son; optional companion', 'Trinsic: northwest part of town'],
  'Gargan': ['Shipwright', 'Trinsic: the shipwright\'s by the docks'],
  'Klog': ['Head of the Trinsic Fellowship branch', 'Trinsic: the Fellowship hall (meetings at 9 p.m.)'],
  'Dell': ['Provisioner', 'Trinsic: the provisioner\'s shop'],

  // Britain
  'Batlin': ['Leader of the Fellowship', 'Britain: Fellowship headquarters. At the end, the Black Gate on the Isle of the Avatar'],
  'Clint': ['Shipwright', 'Britain: the shipwright\'s by the docks'],
  'Sean': ['Jeweler; buys gems', 'Britain: the jewelry shop'],
  'Weston': ['Man jailed for taking an apple', 'Britain: the prison in the castle\'s southwest tower'],
  'Miranda': ['Member of the Great Council; wrote the Lock Lake bill', 'Britain: Lord British\'s castle'],
  'Patterson': ['Mayor of Britain', 'Britain: town hall; follow him after the Fellowship service'],
  'Brownie': ['Farmer running for mayor', 'Britain: his farm'],
  'Candice': ['Curator of the Royal Museum', 'Britain: the Royal Museum'],
  'Gaye': ['Clothier; sells the Avatar costume', 'Britain: the clothing shop'],
  'Raymundo': ['Director of the Royal Theatre', 'Britain: the Royal Theatre'],
  'James': ['Innkeeper', 'Britain: the Wayfarer\'s Inn'],
  'Cynthia': ['James\'s wife', 'Britain: the Royal Mint'],

  // Minoc
  'Elynor': ['Head of the Minoc Fellowship branch', 'Minoc: the Fellowship hall'],
  'Burnside': ['Mayor of Minoc', 'Minoc: the town hall (at first, at the sawmill crime scene)'],
  'Xanthia': ['Candlemaker', 'Minoc: her candle shop'],
  'Margareta': ['Gypsy fortune teller', 'The gypsy camp outside Minoc'],
  'Owen': ['Shipwright about to get a statue', 'Minoc: the shipyard'],
  'Karl': ['Hermit whose brother died on an Owen ship', 'His hut in the mountains outside Minoc'],
  'Julia': ['Tinker', 'Minoc: the tinker\'s shop'],
  'Zorn': ['Blacksmith; forges the Caddellite helmets', 'Minoc: the blacksmith\'s'],

  // The Fellowship trail
  'Elizabeth': ['Fellowship official, always one town ahead', 'Follow her trail town to town; finally at the Black Gate'],
  'Abraham': ['Fellowship official, always one town ahead', 'Follow his trail town to town; finally at the Black Gate'],
  'Feridwyn': ['Runs the Fellowship shelter', 'Paws: the Fellowship shelter'],
  'Joseph': ['Mayor of Jhelom', 'Jhelom: the town hall'],
  'De Snel': ['Weapons trainer (attacks if you show the dagger)', 'Jhelom'],
  'Auston': ['Mayor of Vesper', 'Vesper: the town hall'],
  'Cador': ['Overseer of the Britannian Mining Company', 'Vesper: the mining company office'],
  'Rankin': ['Head of the Moonglow Fellowship branch', 'Moonglow: the Fellowship hall'],
  'Draxinusom': ['King of the gargoyles', 'Terfin: his palace'],
  'Quan': ['Gargoyle head of the Terfin Fellowship branch', 'Terfin: the Fellowship hall'],
  'Ian': ['Runs the Meditation Retreat; admits members only', 'The Fellowship Meditation Retreat'],

  // Cove, Paws, Yew, the emps
  'Rudyom': ['Mage who lost his magic carpet', 'Cove: his house'],
  'Lord Heather': ['Mayor of Cove', 'Cove: the town hall'],
  'De Maria': ['Bard', 'Cove: the tavern'],
  'Nastassia': ['Young woman mourning her father', 'Cove: at the Shrine of Compassion nearby'],
  'Beverlea': ['Antique dealer; sells Nicodemus\'s hourglass', 'Paws: the antique shop'],
  'Morfin': ['Merchant whose silver serpent venom was stolen', 'Paws: the slaughterhouse'],
  'Camille': ['Farmer, Tobias\'s mother', 'Paws: her farm'],
  'Tobias': ['Camille\'s son (wrongly accused)', 'Paws'],
  'Garritt': ['Feridwyn\'s son (the real thief)', 'Paws: the Fellowship shelter'],
  'Polly': ['Shy barmaid', 'Paws: the tavern'],
  'Thurston': ['Miller', 'Paws: the mill'],
  'Taylor': ['Head monk', 'Empath Abbey, near Yew'],
  'Trellek': ['Emp who can call the wisps', 'The emp village in the Silverleaf woods near Empath Abbey'],
  'Saralek': ['Trellek\'s wife', 'The emp village near Empath Abbey'],
  'Salamon': ['Leader of the emps', 'The emp village near Empath Abbey'],
  'Ben': ['Logger cutting silverleaf trees', 'Western edge of the forest near Yew'],
  'Kreg': ['"Monk" who wants an invisibility potion (really the thief Kellin)', 'Yew / Empath Abbey'],
  'Kellin': ['Thief hiding as the monk "Kreg"', 'Yew / Empath Abbey'],
  'Aimi': ['Gardener who sells bouquets', 'Empath Abbey'],
  'Reyna': ['Healer', 'Yew: the healer\'s'],
  'Murray': ['Half of the naked "cave people"', 'The Bee Cave near Yew'],
  'Myrtle': ['Half of the naked "cave people"', 'The Bee Cave near Yew'],
  'Tseramed': ['Hunter who knows the cave people', 'The forest near Yew'],
  'Nicodemus': ['Mage who enchanted the hourglass', 'His house near Empath Abbey (may need Unlock Magic)'],

  // Vesper, Moonglow, Terfin
  'Blorn': ['Thug who stole Lap-Lem\'s locket', 'Vesper'],
  'Lap-Lem': ['Gargoyle robbed by Blorn', 'Vesper'],
  'Penumbra': ['Mage asleep until the ether is fixed', 'Moonglow: her house'],
  'Brion': ['Astronomer, Nelson\'s twin', 'Moonglow: the observatory'],
  'Nelson': ['Head of the Lycaeum, Brion\'s twin', 'Moonglow: the Lycaeum'],
  'Jillian': ['Scholar', 'Moonglow: the Lycaeum'],
  'Zelda': ['Lycaeum advisor, in love with Brion', 'Moonglow: the Lycaeum'],
  'Phearcy': ['Barkeep who loves gossip', 'Moonglow: the tavern'],
  'Morz': ['Farmer with a stutter', 'Moonglow: his farm'],
  'Cubolt': ['Morz\'s brother, also a farmer', 'Moonglow: the farm'],
  'Addom': ['Trader; sells the crystal for the orrery', 'Moonglow'],
  'Balayna': ['Fellowship clerk who suspects Rankin', 'Moonglow: the Fellowship hall'],
  'Teregus': ['Gargoyle who tends the altars', 'Terfin: the altars'],
  'Sarpling': ['Shopkeeper in on the altar plot', 'Terfin: his shop'],
  'Runeb': ['Gargoyle in on the altar plot', 'Terfin'],

  // Serpent's Hold
  'Lord John-Paul': ['Lord of Serpent\'s Hold', 'Serpent\'s Hold'],
  'Sir Richter': ['Knight', 'Serpent\'s Hold'],
  'Lady Leigh': ['Healer', 'Serpent\'s Hold: the healer\'s'],
  'Sir Horffe': ['Gargoyle captain of the guard', 'Serpent\'s Hold'],
  'Lady Tory': ['Counselor', 'Serpent\'s Hold'],
  'Sir Jordan': ['Blind knight', 'Serpent\'s Hold'],
  'Lady Jehanne': ['Provisioner', 'Serpent\'s Hold: the provisioner\'s'],
  'Sir Pendaran': ['Knight (defaced the statue)', 'Serpent\'s Hold'],

  // Jhelom
  'Sprellic': ['Innkeeper who took the honor flag', 'Jhelom: the inn'],
  'Kliftin': ['Tailor who can sew a new flag', 'Jhelom'],
  'Syria': ['Fighter from the Library of Scars', 'Jhelom'],

  // New Magincia
  'Alagner': ['Sage whose notebook the wisp wants', 'New Magincia: his house'],
  'Magenta': ['Mayor of New Magincia', 'New Magincia: the town hall'],
  'Henry': ['Young man who lost his locket', 'New Magincia'],
  'Constance': ['Henry\'s beloved', 'New Magincia'],
  'Boris': ['Tavernkeeper', 'New Magincia: the tavern'],

  // Skara Brae
  'Ferryman': ['Ferries the dead (needs Seance)', 'The ferry station on the west coast, across from Skara Brae'],
  'Caine': ['Alchemist, the Tortured One', 'Skara Brae'],
  'Horance': ['The liche ruling Skara Brae', 'Skara Brae: the Dark Tower'],
  'Mordra': ['Ghost healer', 'Skara Brae'],
  'Trent': ['Ghost blacksmith, Rowena\'s husband', 'Skara Brae: his smithy'],
  'Rowena': ['Trent\'s wife, held by Horance', 'Skara Brae: the Dark Tower (northwest)'],
  'Forsythe': ['Mayor of Skara Brae (ghost)', 'Skara Brae'],

  // Wisps, Time Lord, dungeons, islands
  'Time Lord': ['Guardian of time who sent the red moongate', 'Imprisoned in Dungeon Despise (reached through the wisp)'],
  'Martingo': ['Sultan of Spektran; has the Ethereal Ring', 'Spektran, the island northwest of Terfin'],
  'Amanda': ['Sister hunting the cyclops', 'Dungeon Deceit'],
  'Eiko': ['Sister hunting the cyclops', 'Dungeon Deceit'],
  'Iskander': ['Cyclops', 'Dungeon Deceit'],
  'Gorn': ['Barbarian', 'The caves north of the Meditation Retreat'],
  'Iriale Silvermist': ['Sorceress guarding the cube\'s generator', 'The caves north of the Meditation Retreat'],
  'Garok Al-Mat': ['Lost adventurer', 'Dungeon Despise'],
  'Cosmo': ['Ophelia\'s suitor, hunting a unicorn', 'Dungeon Destard'],

  // Buccaneer's Den
  'Hook': ['Hook-handed murderer', 'Buccaneer\'s Den: the caves behind the House of Games. At the end, the Black Gate'],
  'Mandy': ['Barmaid', 'Buccaneer\'s Den: the tavern'],
  'Budo': ['Merchant', 'Buccaneer\'s Den'],
  'Danag': ['Fellowship officer', 'Buccaneer\'s Den: the Fellowship hall'],
  'Gordy': ['Owner of the House of Games', 'Buccaneer\'s Den: the House of Games'],
  'Sintag': ['Guard holding the tunnel key', 'Buccaneer\'s Den: the House of Games'],
  'Grod': ['Jailer and torturer', 'Buccaneer\'s Den: the torture chamber in the caves'],
  'Anton': ['Prisoner', 'Buccaneer\'s Den: the torture chamber'],
  'Sullivan': ['Con man posing as the Avatar', 'Buccaneer\'s Den: the torture chamber'],
  'Blacktooth': ['Old pirate', 'Buccaneer\'s Den'],
  'Mole': ['Old pirate, Blacktooth\'s former friend', 'Buccaneer\'s Den'],

  // Black Gate, Isle of Fire
  'Forskis': ['Fellowship thug', 'The Black Gate, Isle of the Avatar'],
  'Erethian': ['Blind old mage', 'The Isle of Fire: the castle'],
  'Arcadion': ['Daemon bound in a mirror', 'The Isle of Fire: Erethian\'s castle'],
  'Bollux': ['Golem', 'The Isle of Fire: the Test of Love'],
  'Adjhar': ['Bollux\'s shattered golem brother', 'The Isle of Fire: the Test of Love'],
  'Dracothraxus': ['Dragon', 'The Isle of Fire: the Test of Courage']
};
