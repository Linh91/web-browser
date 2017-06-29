const Graphic = function() {

this.pic =  " \n\
                           `..--:::::---.`       \n\
                      .:+osyyysssssoooossssyyyso+:.                              \n\
                   `:oysssooooooooooooooooooooooosssyo:`                          \n\
                  `+ysooso+oosooooooooooooooooossooosoosy+`                        \n\
                 /ysoos/`` ``./soo+++++oooooos/.````./yoosy/                       \n\
               oyoooy.        .y+++++oo++++y.        .yoooyo                      \n\
      ``/yyo.`+soossy    s:    s++++sys++++s    -s    ssoooys+/.++----  \n\
      ..omydyyyoooyyy-`  `    .yooyyssssysoy-    `  `.yyyooodhmhhdy---            \n\
      /dhyhyhdmoss/::+/-`` `-:+:syoooooooys:+/-```.-:+::/osoymhyyyhd-.            \n\
    ./ydyyyyydhso--:++oo+///::--doooooooood--::///+oo++:--osymyyyhym+-            \n\
    -mhhhyyymdoy--+mMMMNmho/---/doooooooooh/---/ohmNMMMm+--yommyyhhhhd`           \n\
    `::yyyyyhyos--mMMMMMMMMNmhshssooooooooshshmNMMMMMMMMm--sodhhhhs++/            \n\
            `dos--sMMMMMMMMMMNhssssssssssssshNMMMMMMMMMMs--ood.````               \n\
             dos---+mMMMMMMMMMNNmmmmmmmmmmmNNMMMMMMMMMm+---ssm                    \n\
  ``.`      hsy:----+ymNMMMMMMMMNdyhmhyhNMMMMMMMMNmy+----:yyd                    \n\
`+yhhyyo:.` oysy:------/+shmmNNNy+/////:oNNNmmhs+/------:ssys                    \n\
+dhdddhddhyssdyss+-----------://///////////:-----------+yssd.                    \n\
ydhddhdddhhdhmhsssso+::::/+++ooooooooooooooo++//::::/osysshd`                    \n\
+mhdhhddhdhdmddhyssssysssooosssssssssssssssssoo+ossyssssyhdd:                    \n\
 odddddddddhhdhhdyysssssys+/:---------------:/+oyyssssyyddho                     \n\
  .:+ooo++/:-ohhhhmdyyhs:::::::-------------:::::ohyyhhhhhh+`                    \n\
            `oyhhhhy-+ysooo++++///////++++++ooooo+yo+dhhhhyo.                    \n\
                ``   `   `..-:::::::/:::::::--.`    ` ````      ";

this.title =   "                   _____    _           _                                 \n\
                  |  __ \\  | |         | |                                \n\
                  | |__) | | |   __ _  | |_   _   _   _ __    _   _   ___ \n\
                  |  ___/  | |  / _` | | __| | | | | | '_ \\  | | | | / __|\n\
                  | |      | | | (_| | | |_  | |_| | | |_) | | |_| | \\__ \\ \n\
                  |_|      |_|  \\__,_|  \\__|  \\__, | | .__/   \\__,_| |___/\n\
                                               __/ | | |                  \n\
                                              |___/  |_|                  ";

this.logo = ('\n' + this.pic + '\n' + this.title);
};

module.exports = Graphic;
