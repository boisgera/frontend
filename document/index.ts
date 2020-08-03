import m from "mithril";
import "./typography";
import { Section, Paragraph } from "./document";
import { assert, HTML } from "./utils";

function main() {
  let root = document.querySelector("main");
  assert(root !== null);
  m.mount(root, {
    view: () => [
      m(Paragraph, "Simple préambule ..."),
      m(
        Section,
        { level: 1, title: "Gabudouleu", headerDisplay: "run-in" },
        m(
          Paragraph, `Un paragraphe est une section `, m("span", {style: {marginBottom: "5em"}}, "stuff"), ` de texte en prose vouée au développement d'un point particulier souvent au moyen de plusieurs phrases, dans la continuité du précédent et du suivant.
          Sur le plan typographique, le début d'un paragraphe est marqué par un léger renfoncement (alinéa) ou par un saut de ligne.
          Le symbole du paragraphe est §. La fin d'un paragraphe était autrefois indiquée par un pied-de-mouche`
        )),
      m(
        Section,
        { level: 1, title: "Le titre du document" },
        m(
          Paragraph,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ),
        m(
          Paragraph, {justify: true},
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ),
        m(
          Paragraph, 
          "Paris est la capitale de la France. L’agglomération de Paris compte plus de 10 millions d’habitants. Un fleuve traverse la capitale française, c’est la Seine. Dans Paris, il y a deux îles :  l’île de la Cité et l’île Saint-Louis. Paris compte vingt arrondissements. Le 16e, le 7e et le 8e arrondissements de Paris sont les quartiers les plus riches. Ils sont situés dans l’ouest de la capitale. Les quartiers populaires comme le 19e et le 20e sont au nord-est de la ville. Les monuments célèbres, les ministères, le palais de l’Élysée sont situés dans le centre de Paris. Paris est la capitale économique, la capitale politique et la capitale culturelle de la France. La ville compte beaucoup de lieux célèbres dans le monde entier comme « la tour Eiffel » , « l’Arc de Triomphe » et « Notre-Dame de Paris ». Les musées parisiens aussi sont très connus. Il y a, par exemple, le musée du Louvre. C’est le plus grand musée de France. On peut voir dans le musée du Louvre des tableaux magnifiques. Le plus célèbre est certainement « La Joconde » de Léonard de Vinci. Paris est une ville très touristique. Chaque année, des millions de touristes du monde entier marchent sur les Champs-Élysées. Ils séjournent à l’hôtel, louent des chambres d’hôtes ou des appartements pour une semaine."
          ),
        m(
          Paragraph, {justify: true}, 
          "Paris est la capitale de la France. L’agglomération de Paris compte plus de 10 millions d’habitants. Un fleuve traverse la capitale française, c’est la Seine. Dans Paris, il y a deux îles :  l’île de la Cité et l’île Saint-Louis. Paris compte vingt arrondissements. Le 16e, le 7e et le 8e arrondissements de Paris sont les quartiers les plus riches. Ils sont situés dans l’ouest de la capitale. Les quartiers populaires comme le 19e et le 20e sont au nord-est de la ville. Les monuments célèbres, les ministères, le palais de l’Élysée sont situés dans le centre de Paris. Paris est la capitale économique, la capitale politique et la capitale culturelle de la France. La ville compte beaucoup de lieux célèbres dans le monde entier comme « la tour Eiffel » , « l’Arc de Triomphe » et « Notre-Dame de Paris ». Les musées parisiens aussi sont très connus. Il y a, par exemple, le musée du Louvre. C’est le plus grand musée de France. On peut voir dans le musée du Louvre des tableaux magnifiques. Le plus célèbre est certainement « La Joconde » de Léonard de Vinci. Paris est une ville très touristique. Chaque année, des millions de touristes du monde entier marchent sur les Champs-Élysées. Ils séjournent à l’hôtel, louent des chambres d’hôtes ou des appartements pour une semaine."
            ),
        m(
          Section,
          { level: 2, title: "Titre de section" },
          m(
            Paragraph,
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          ),
          m(
            Section,
            { level: 3, title: "Sous-section" },
            m(
              Paragraph,
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            )
          ),
          m(
            Section,
            { level: 3, title: "Sous-section", headerDisplay: "run-in" },
            m(
              Paragraph,
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            )
          )
        ),
        m(
          Section,
          { level: 2, title: "Titre de section" },
          m(
            Paragraph,
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          )
        ),
        m(
          Paragraph,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        ),
        m(
          Paragraph,
          "Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum, qui permet donc de faire office de texte d'attente. L'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique. ",
          "Ce texte a pour autre avantage d'utiliser des mots de longueur variable, essayant de simuler une occupation normale. La méthode simpliste consistant à copier-coller un court texte plusieurs fois (« ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte ») a l'inconvénient de ne pas permettre une juste appréciation typographique du résultat final. ",
          "Il circule des centaines de versions différentes du Lorem ipsum, mais ce texte aurait originellement été tiré de l'ouvrage de Cicéron, De Finibus Bonorum et Malorum (Liber Primus, 32), texte populaire à cette époque, dont l'une des premières phrases est : « Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... » (« Il n'existe personne qui aime la souffrance pour elle-même, ni qui la recherche ni qui la veuille pour ce qu'elle est... »). ",
          "Expert en utilisabilité des sites web et des logiciels, Jakob Nielsen souligne que l'une des limites de l'utilisation du faux-texte dans la conception de sites web est que ce texte n'étant jamais lu, il ne permet pas de vérifier sa lisibilité effective. La lecture à l'écran étant plus difficile, cet aspect est pourtant essentiel. Nielsen préconise donc l'utilisation de textes représentatifs plutôt que du lorem ipsum. On peut aussi faire remarquer que les formules conçues avec du faux-texte ont tendance à sous-estimer l'espace nécessaire à une titraille immédiatement intelligible, ce qui oblige les rédactions à formuler ensuite des titres simplificateurs, voire inexacts, pour ne pas dépasser l'espace imparti. ",
          "Contrairement à une idée répandue, le faux-texte ne donne même pas un aperçu réaliste du gris typographique, en particulier dans le cas des textes justifiés : en effet, les mots fictifs employés dans le faux-texte ne faisant évidemment pas partie des dictionnaires des logiciels de PAO, les programmes de césure ne peuvent pas effectuer leur travail habituel sur de tels textes. Par conséquent, l'interlettrage du faux-texte sera toujours quelque peu supérieur à ce qu'il aurait été avec un texte réel, qui présentera donc un aspect plus sombre et moins lisible que le faux-texte avec lequel le graphiste a effectué ses essais. Un vrai texte pose aussi des problèmes de lisibilité spécifiques (noms propres, numéros de téléphone, retours à la ligne fréquents, composition des citations en italiques, intertitres de plus de deux lignes...) qu'on n'observe jamais dans le faux-texte."
        ),
        m(
          Paragraph,
          "Evidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment, évidemment"
        )
      ),
    ],
  });
}

HTML.ready(main);
