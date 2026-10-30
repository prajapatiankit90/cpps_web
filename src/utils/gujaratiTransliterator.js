// Gujarati transliteration helper for member names, villages, and community data

const dict = {
  // Surnames / Common terms
  'prajapati': 'પ્રજાપતિ',
  'patel': 'પટેલ',
  'kumar': 'કુમાર',
  'sinh': 'સિંહ',
  'bhai': 'ભાઈ',
  'ben': 'બેન',
  'ram': 'રામ',
  'lal': 'લાલ',
  'das': 'દાસ',

  // Common Names
  'kanjibhai': 'કાનજીભાઈ',
  'gangarambhai': 'ગંગારામભાઈ',
  'ramjibhai': 'રામજીભાઈ',
  'ranchodbhai': 'રણછોડભાઈ',
  'sureshbhai': 'સુરેશભાઈ',
  'vasrambhai': 'વસરામભાઈ',
  'lalabhai': 'લાલાભાઈ',
  'govindbhai': 'ગોવિંદભાઈ',
  'jamabhai': 'જામાભાઈ',
  'ganeshbhai': 'ગણેશભાઈ',
  'pirabhai': 'પીરાભાઈ',
  'shivabhai': 'શિવાભાઈ',
  'mavnabhai': 'માવનાભાઈ',
  'okhabhai': 'ઓખાભાઈ',
  'dineshbhai': 'દિનેશભાઈ',
  'dipakbhai': 'દીપકભાઈ',
  'shankarbhai': 'શંકરભાઈ',
  'danabhai': 'દાનાભાઈ',
  'harjibhai': 'હરજીભાઈ',
  'jivrajbhai': 'જીવરાજભાઈ',
  'nagjibhai': 'નાગજીભાઈ',
  'babubhai': 'બાબુભાઈ',
  'bharatbhai': 'ભરતભાઈ',
  'alpeshbhai': 'અલ્પેશભાઈ',
  'ashishbhai': 'આશિષભાઈ',
  'arjanbhai': 'અરજણભાઈ',
  'mohanbhai': 'મોહનભાઈ',
  'jalpeshbhai': 'જલ્પેશભાઈ',
  'karshanbhai': 'કરશનભાઈ',
  'ishwarbhai': 'ઈશ્વરભાઈ',
  'pathubhai': 'પથુભાઈ',
  'devshibhai': 'દેવશીભાઈ',
  'dalabhai': 'દલાભાઈ',
  'bhurabhai': 'ભૂરાભાઈ',
  'mavabhai': 'માવાભાઈ',
  'premabhai': 'પ્રેમાભાઈ',
  'rajabhai': 'રાજાભાઈ',
  'valjibhai': 'વાલજીભાઈ',
  'rajeshbhai': 'રાજેશભાઈ',
  'manishbhai': 'મનીષભાઈ',
  'ashokbhai': 'અશોકભાઈ',
  'dudabhai': 'દુદાભાઈ',
  'gangadasbhai': 'ગંગદાસભાઈ',
  'ravjibhai': 'રવજીભાઈ',
  'patabhai': 'પાતાભાઈ',
  'bhikhabhai': 'ભીખાભાઈ',
  'savjibhai': 'સવજીભાઈ',
  'rupsibhai': 'રૂપસીભાઈ',
  'dharmabhai': 'ધર્માભાઈ',
  'jagtabhai': 'જગતાભાઈ',
  'ratabhai': 'રતાભાઈ',
  'mavjibhai': 'માવજીભાઈ',
  'hirabhai': 'હીરાભાઈ',
  'bhagabhai': 'ભગાભાઈ',
  'khengarbhai': 'ખેંગારભાઈ',
  'narayanbhai': 'નારાયણભાઈ',
  'amrutbhai': 'અમૃતભાઈ',
  'hiteshbhai': 'હિતેશભાઈ',
  'mukeshbhai': 'મુકેશભાઈ',
  'nareshbhai': 'નરેશભાઈ',
  'hareshbhai': 'હરેશભાઈ',
  'pankajbhai': 'પંકજભાઈ',
  'kamleshbhai': 'કમલેશભાઈ',
  'sanjaybhai': 'સંજયભાઈ',
  'vijaybhai': 'વિજયભાઈ',
  'ajaybhai': 'અજયભાઈ',
  'maheshbhai': 'મહેશભાઈ',
  'rameshbhai': 'રમેશભાઈ',

  // Common Villages
  'abhepura': 'અભેપુરા',
  'aeta': 'એટા',
  'asara': 'અશારા',
  'bhatvar': 'ભાટવર',
  'bhatvarvas': 'ભાટવરવાસ',
  'benap': 'બેણપ',
  'khorda': 'ખોરડાં',
  'limbada': 'લીંબાળા',
  'suigam': 'સુઈગામ',
  'jampur': 'જામપુર',
  'vav': 'વાવ',
  'koreti': 'કોરેટી',
  'devpura': 'દેવપુરા',
  'mamana': 'મમાણા',
  'unchpa': 'ઉંચપા',
  'tharad': 'થરાદ',
  'rachena': 'રાછેણા',
  'umedpura': 'ઉમેદપુરા',
  'dudosan': 'દુદોસણ',
  'padan': 'પાડણ'
};

const initials = {
  'a': 'એ.', 'b': 'બી.', 'c': 'સી.', 'd': 'ડી.', 'e': 'ઈ.', 'f': 'એફ.',
  'g': 'જી.', 'h': 'એચ.', 'i': 'આઈ.', 'j': 'જે.', 'k': 'કે.', 'l': 'એલ.',
  'm': 'એમ.', 'n': 'એન.', 'o': 'ઓ.', 'p': 'પી.', 'q': 'ક્યુ.', 'r': 'આર.',
  's': 'એસ.', 't': 'ટી.', 'u': 'યુ.', 'v': 'વી.', 'w': 'ડબલ્યુ.', 'x': 'એક્સ.',
  'y': 'વાય.', 'z': 'ઝેડ.'
};

const consonants = [
  ['ksh', 'ક્ષ'], ['gy', 'જ્ઞ'], ['gn', 'જ્ઞ'], ['shr', 'શ્ર'], ['chh', 'છ'],
  ['kh', 'ખ'], ['gh', 'ઘ'], ['ch', 'ચ'], ['jh', 'ઝ'], ['th', 'થ'],
  ['dh', 'ધ'], ['ph', 'ફ'], ['bh', 'ભ'], ['sh', 'શ'],
  ['k', 'ક'], ['g', 'ગ'], ['j', 'જ'], ['t', 'ત'], ['d', 'દ'],
  ['n', 'ન'], ['p', 'પ'], ['b', 'બ'], ['m', 'મ'], ['y', 'ય'],
  ['r', 'ર'], ['l', 'લ'], ['v', 'વ'], ['w', 'વ'], ['s', 'સ'], ['h', 'હ']
];

const vowels = [
  ['aa', 'ા'], ['ee', 'ી'], ['oo', 'ૂ'], ['ai', 'ૈ'], ['au', 'ૌ'],
  ['a', ''], ['i', 'િ'], ['u', 'ુ'], ['e', 'ે'], ['o', 'ો']
];

const initialVowels = [
  ['aa', 'આ'], ['ee', 'ઈ'], ['oo', 'ઊ'], ['ai', 'ઐ'], ['au', 'ઔ'],
  ['a', 'અ'], ['i', 'ઇ'], ['u', 'ઉ'], ['e', 'એ'], ['o', 'ઓ']
];

function transliteratePhonetic(str) {
  let res = '';
  let i = 0;
  let isStart = true;

  while (i < str.length) {
    if (isStart) {
      let matchedIv = false;
      for (const [v, gv] of initialVowels) {
        if (str.startsWith(v, i)) {
          res += gv;
          i += v.length;
          matchedIv = true;
          isStart = false;
          break;
        }
      }
      if (matchedIv) continue;
    }

    let matchedC = false;
    for (const [c, gc] of consonants) {
      if (str.startsWith(c, i)) {
        i += c.length;
        matchedC = true;
        isStart = false;

        let matchedV = false;
        for (const [v, gv] of vowels) {
          if (str.startsWith(v, i)) {
            res += gc + gv;
            i += v.length;
            matchedV = true;
            break;
          }
        }
        if (!matchedV) {
          if (i < str.length && !str.startsWith(' ', i)) {
            res += gc + '્';
          } else {
            res += gc;
          }
        }
        break;
      }
    }

    if (!matchedC) {
      let matchedV = false;
      for (const [v, gv] of initialVowels) {
        if (str.startsWith(v, i)) {
          res += gv;
          i += v.length;
          matchedV = true;
          break;
        }
      }
      if (!matchedV) {
        res += str[i];
        i++;
      }
    }
  }
  return res;
}

function transliterateWord(word) {
  const cleanWord = word.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
  const lower = cleanWord.toLowerCase();
  if (!lower) return word;

  if (lower.length === 1 && initials[lower]) {
    return initials[lower];
  }
  if (dict[lower]) {
    return dict[lower];
  }

  if (lower.endsWith('bhai') && lower.length > 4) {
    const prefix = lower.slice(0, -4);
    if (dict[prefix]) return dict[prefix] + 'ભાઈ';
    return transliteratePhonetic(prefix) + 'ભાઈ';
  }
  if (lower.endsWith('ben') && lower.length > 3) {
    const prefix = lower.slice(0, -3);
    if (dict[prefix]) return dict[prefix] + 'બેન';
    return transliteratePhonetic(prefix) + 'બેન';
  }

  return transliteratePhonetic(lower);
}

export function toGujarati(text) {   
  if (!text) return '';
  const trimmed = String(text).trim();
  // If already contains Gujarati unicode characters, return as is
  if (/[\u0A80-\u0AFF]/.test(trimmed)) return trimmed;

  return trimmed.split(/\s+/).map(transliterateWord).join(' ');
}
