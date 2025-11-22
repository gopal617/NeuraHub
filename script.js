let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
let customTools = JSON.parse(localStorage.getItem("customTools") || "[]");
let activeCategory = "All";

// Default AI tools
const defaultTools = [
  // 🧠 Chatbots
  { name: "ChatGPT", category: "Chatbots", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", link: "https://chat.openai.com", desc: "Conversational AI chatbot by OpenAI." },
  { name: "Claude", category: "Chatbots", logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Anthropic_logo.svg", link: "https://claude.ai", desc: "Anthropic’s conversational model for reasoning." },
  { name: "Gemini", category: "Chatbots", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Google_Gemini_logo.svg", link: "https://gemini.google.com", desc: "Google's multimodal conversational AI." },
  { name: "Perplexity AI", category: "Chatbots", logo: "https://pbs.twimg.com/profile_images/1653201413492174849/EE4ENjD6_400x400.png", link: "https://perplexity.ai", desc: "AI search engine that provides instant answers." },
  { name: "Pi", category: "Chatbots", logo: "https://avatars.githubusercontent.com/u/134772404?s=200&v=4", link: "https://pi.ai", desc: "Friendly AI companion developed by Inflection AI." },
  { name: "Character AI", category: "Chatbots", logo: "https://beta.character.ai/favicon.ico", link: "https://beta.character.ai", desc: "Chat with AI characters and personalities." },
  { name: "YouChat", category: "Chatbots", logo: "https://you.com/favicon.ico", link: "https://you.com", desc: "AI assistant integrated with web search results." },
  { name: "HuggingChat", category: "Chatbots", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", link: "https://huggingface.co/chat/", desc: "Open-source alternative to ChatGPT." },

  // 🎨 Image Tools
  { name: "Midjourney", category: "Image", logo: "https://seeklogo.com/images/M/midjourney-logo-688A5B1A47-seeklogo.com.png", link: "https://midjourney.com", desc: "Text-to-image generator known for aesthetic results." },
  { name: "Leonardo AI", category: "Image", logo: "https://leonardo.ai/favicon.ico", link: "https://leonardo.ai", desc: "AI image generator and fine-tuning tool." },
  { name: "Ideogram", category: "Image", logo: "https://ideogram.ai/favicon.ico", link: "https://ideogram.ai", desc: "AI art creation platform with typography." },
  { name: "Canva AI", category: "Image", logo: "https://static.canva.com/static/images/favicon.png", link: "https://canva.com", desc: "Graphic design platform with AI image generation." },
  { name: "Remove.bg", category: "Image", logo: "https://www.remove.bg/favicon.ico", link: "https://remove.bg", desc: "AI background remover for images." },
  { name: "Playground AI", category: "Image", logo: "https://playground.com/favicon.ico", link: "https://playground.com", desc: "Create and edit AI-generated images easily." },
  { name: "Fotor AI", category: "Image", logo: "https://www.fotor.com/favicon.ico", link: "https://www.fotor.com", desc: "AI photo enhancer and image generator." },
  { name: "Artbreeder", category: "Image", logo: "https://www.artbreeder.com/favicon.ico", link: "https://www.artbreeder.com", desc: "Collaborative image blending using AI." },
  { name: "Bing Image Creator", category: "Image", logo: "https://www.bing.com/favicon.ico", link: "https://bing.com/create", desc: "Image generation using DALL·E 3 via Microsoft." },
  { name: "Pincel", category: "Image", logo: "https://pincel.app/favicon.ico", link: "https://pincel.app", desc: "AI sketch and paint creation tool." },

  // 🎬 Video Tools
  { name: "Runway", category: "Video", logo: "https://seeklogo.com/images/R/runway-logo-0DC2D98F59-seeklogo.com.png", link: "https://runwayml.com", desc: "AI video creation and editing suite." },
  { name: "Pika Labs", category: "Video", logo: "https://pika.art/favicon.ico", link: "https://pika.art", desc: "Generate videos from text prompts." },
  { name: "Synthesia", category: "Video", logo: "https://synthesia.io/favicon.ico", link: "https://synthesia.io", desc: "AI avatar video generation from text." },
  { name: "Veed.io", category: "Video", logo: "https://www.veed.io/favicon.ico", link: "https://www.veed.io", desc: "AI-powered online video editor." },
  { name: "Lumen5", category: "Video", logo: "https://lumen5.com/favicon.ico", link: "https://lumen5.com", desc: "AI turns text into engaging videos." },
  { name: "Descript", category: "Video", logo: "https://www.descript.com/favicon.ico", link: "https://www.descript.com", desc: "Edit videos by editing text." },
  { name: "Kaiber", category: "Video", logo: "https://www.kaiber.ai/favicon.ico", link: "https://www.kaiber.ai", desc: "AI video generator for creative storytelling." },
  { name: "HeyGen", category: "Video", logo: "https://www.heygen.com/favicon.ico", link: "https://heygen.com", desc: "Generate talking avatar videos." },
  { name: "Hour One", category: "Video", logo: "https://hourone.ai/favicon.ico", link: "https://hourone.ai", desc: "AI human avatar video production." },
  { name: "Synthesys", category: "Video", logo: "https://synthesys.io/favicon.ico", link: "https://synthesys.io", desc: "Text-to-speech & AI video creation." },

  // 💻 Coding Tools
  { name: "GitHub Copilot", category: "Coding", logo: "https://github.githubassets.com/favicons/favicon.png", link: "https://github.com/features/copilot", desc: "AI pair programmer for faster coding." },
  { name: "Codeium", category: "Coding", logo: "https://codeium.com/favicon.ico", link: "https://www.codeium.com", desc: "AI autocomplete and code assistant." },
  { name: "Replit Ghostwriter", category: "Coding", logo: "https://replit.com/public/icons/favicon.ico", link: "https://replit.com", desc: "AI code completion in Replit IDE." },
  { name: "Tabnine", category: "Coding", logo: "https://www.tabnine.com/favicon.ico", link: "https://www.tabnine.com", desc: "AI code completion assistant." },
  { name: "Blackbox AI", category: "Coding", logo: "https://www.useblackbox.io/favicon.ico", link: "https://www.useblackbox.io", desc: "Code generator & problem solver." },
  { name: "Amazon CodeWhisperer", category: "Coding", logo: "https://aws.amazon.com/favicon.ico", link: "https://aws.amazon.com/codewhisperer/", desc: "AI coding suggestions by AWS." },
  { name: "Mutable AI", category: "Coding", logo: "https://mutable.ai/favicon.ico", link: "https://mutable.ai", desc: "AI-assisted code editing & documentation." },
  { name: "Sourcegraph Cody", category: "Coding", logo: "https://about.sourcegraph.com/favicon.ico", link: "https://about.sourcegraph.com/cody", desc: "AI coding assistant for large codebases." },
  { name: "CodiumAI", category: "Coding", logo: "https://www.codium.ai/favicon.ico", link: "https://www.codium.ai", desc: "AI test generator for developers." },
  { name: "Kite", category: "Coding", logo: "https://www.kite.com/favicon.ico", link: "https://www.kite.com", desc: "Code completion and learning assistant." },
];

// === Core Logic ===
const grid = document.getElementById("toolsGrid");
const filters = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const themeBtn = document.getElementById("themeBtn");
const toast = document.getElementById("toast");
const toolCount = document.getElementById("toolCount");
const totalCount = document.getElementById("totalCount");
const favCount = document.getElementById("favCount");
const customCount = document.getElementById("customCount");

function getTools() { return [...defaultTools, ...customTools]; }
function showToast(msg) { toast.textContent = msg; toast.style.display = "block"; setTimeout(() => toast.style.display = "none", 1600); }

function renderFilters() {
  const cats = ["All", "Favorites", ...new Set(getTools().map(t => t.category))];
  filters.innerHTML = cats.map(c => `<button class="filter-btn ${c === activeCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`).join("");
  document.querySelectorAll(".filter-btn").forEach(b => {
    b.onclick = () => { activeCategory = b.dataset.cat; renderFilters(); renderTools(); };
  });
}

function renderStats() {
  totalCount.textContent = getTools().length;
  favCount.textContent = favorites.length;
  customCount.textContent = customTools.length;
}

function renderTools() {
  let list = getTools();
  const q = searchInput.value.toLowerCase();
  if (activeCategory !== "All" && activeCategory !== "Favorites")
    list = list.filter(t => t.category === activeCategory);
  if (activeCategory === "Favorites")
    list = list.filter(t => favorites.includes(t.name));
  if (q) list = list.filter(t => (t.name + t.category + t.desc).toLowerCase().includes(q));
  const sort = sortSelect.value;
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "category") list.sort((a, b) => a.category.localeCompare(b.category));
  else list.reverse();

  grid.innerHTML = "";
  list.forEach(t => {
    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `
      <button class="favorite ${favorites.includes(t.name) ? 'active' : ''}">⭐</button>
      <img src="${t.logo || 'https://cdn-icons-png.flaticon.com/512/3039/3039389.png'}"
           class="tool-logo"
           onerror="this.onerror=null;this.src='https://cdn-icons-png.flaticon.com/512/3039/3039389.png'">
      <h3>${t.name}</h3><p>${t.category}</p>`;
    card.querySelector(".favorite").onclick = e => {
      e.stopPropagation();
      if (favorites.includes(t.name)) favorites = favorites.filter(x => x !== t.name);
      else favorites.push(t.name);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderTools(); renderStats();
    };
    card.onclick = () => window.open(t.link, "_blank");
    grid.append(card);
  });
  toolCount.textContent = `Showing ${list.length} tools`;
  renderStats();
}

// === Custom Tool Add ===
document.getElementById("addToolBtn").onclick = () => {
  const name = toolName.value.trim(), cat = toolCategory.value.trim() || "Other",
    logo = toolLogo.value.trim(), link = toolLink.value.trim(), desc = toolDesc.value.trim();
  if (!name || !link) return showToast("Name & link required");
  const newTool = { name, category: cat, logo, link, desc };
  customTools.push(newTool);
  localStorage.setItem("customTools", JSON.stringify(customTools));
  showToast("Tool Added ✅");
  renderFilters(); renderTools();
};

document.getElementById("clearCustomBtn").onclick = () => {
  if (confirm("Clear all custom tools?")) {
    customTools = [];
    localStorage.removeItem("customTools");
    renderFilters(); renderTools();
  }
};

// === Theme ===
if (window.matchMedia("(prefers-color-scheme: dark)").matches)
  document.body.classList.add("dark");
if (localStorage.getItem("theme") === "dark")
  document.body.classList.add("dark");
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

// === Listeners ===
searchInput.oninput = renderTools;
sortSelect.onchange = renderTools;
document.addEventListener("keydown", e => { if (e.key === "§") document.querySelector(".add-tool").classList.toggle("hidden"); });

// === Init ===
renderFilters();
renderTools();
renderStats();