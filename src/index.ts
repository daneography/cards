import './style.css';
let cardTexts: string[] = [];

const fileSelectionView = document.getElementById("file-selection-view") as HTMLDivElement;
const cardView = document.getElementById("card-view") as HTMLDivElement;
const deckButtonsContainer = document.getElementById('deck-buttons-container') as HTMLElement;
const backBtn = document.getElementById("back-btn") as HTMLButtonElement;
const cardButton = document.getElementById("card") as HTMLDivElement;

async function loadCardTexts(filePath: string) {
  cardTexts.length = 0;
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    cardTexts.push(...text.split('\n').filter(line => line.trim() !== ""));
  } catch (error) {
    console.error("Failed to load card texts:", error);
  }
}

async function createDeckButtons() {
  try {
  const response = await fetch('/api/cards');
  const files = await response.json();

  if(files.length === 0) {
    deckButtonsContainer.innerHTML = 'No decks available.';
    return;
  }

  files.forEach((file: string) => {
    const button = document.createElement('button');
    button.value = `cards/${file}`;
    button.textContent = file.replace('.txt', '').replace(/_/g, ' ');
    var root =  new String("cards/");
    button.onclick = () => loadDeck(root.concat(file.toString()));
    deckButtonsContainer.appendChild(button);

  });
  } catch (error) {
  console.error("Failed to load card files:", error);
  }
}

async function loadDeck(filePath: string) {
  fileSelectionView.style.display = 'none';
  cardView.style.display = 'flex';
  cardButton.innerText = 'Click to draw';
  await loadCardTexts(filePath);
  showCardView();
}

function showCardView() {
  fileSelectionView.style.display = 'none';
  cardView.style.display = 'block';
}

cardButton.addEventListener('click', () => {
  if (cardTexts.length > 0) {
    const randomIndex = Math.floor(Math.random() * cardTexts.length);
    cardButton.innerText = cardTexts[randomIndex];
  } else {
    cardButton.innerText = 'No More cards!';
  }
});

backBtn.addEventListener("click", () => {
  cardView.style.display = 'none';
  fileSelectionView.style.display = 'block';
});

createDeckButtons();
