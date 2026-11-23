const languageButton=document.querySelector('.language-toggle');
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.main-nav');
const translations={};
let currentLanguage=localStorage.getItem('portfolio-language')||'pt';
async function loadLanguage(language){
 try{
  if(!translations[language]){
   const response=await fetch('content/'+language+'.json');
   if(!response.ok)throw new Error('Translation file not found');
   translations[language]=await response.json();
  }
  document.documentElement.lang=language==='pt'?'pt-BR':'en';
  document.querySelectorAll('[data-i18n]').forEach((el)=>{const value=translations[language][el.dataset.i18n];if(value!==undefined)el.textContent=value});
  document.querySelectorAll('[data-i18n-html]').forEach((el)=>{const value=translations[language][el.dataset.i18nHtml];if(value!==undefined)el.innerHTML=value});
  document.querySelectorAll('[data-i18n-alt]').forEach((el)=>{const value=translations[language][el.dataset.i18nAlt];if(value!==undefined)el.alt=value});
  document.querySelectorAll('[data-i18n-aria]').forEach((el)=>{const value=translations[language][el.dataset.i18nAria];if(value!==undefined)el.setAttribute('aria-label',value)});
  document.querySelectorAll('[data-lang-option]').forEach((el)=>{const active=el.dataset.langOption===language;el.classList.toggle('is-active',active);if(active)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current')});
  languageButton.setAttribute('aria-label',translations[language].languageToggleLabel);
  document.title=translations[language].pageTitle;
  currentLanguage=language;localStorage.setItem('portfolio-language',language);
 }catch(error){console.error('Could not load portfolio language:',error)}
}
languageButton.addEventListener('click',()=>loadLanguage(currentLanguage==='pt'?'en':'pt'));
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));navigation.dataset.open=String(!open)});
navigation.querySelectorAll('a').forEach((link)=>link.addEventListener('click',()=>{navigation.dataset.open='false';menuButton.setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&navigation.dataset.open==='true'){navigation.dataset.open='false';menuButton.setAttribute('aria-expanded','false');menuButton.focus()}});
document.getElementById('year').textContent=new Date().getFullYear();
loadLanguage(currentLanguage);
