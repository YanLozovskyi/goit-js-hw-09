const t=document.querySelector(".location"),n=document.querySelector(".table-container"),e=document.querySelector(".text"),o=document.querySelector(".deal");t.addEventListener("click",(function(){navigator.geolocation.getCurrentPosition((t=>{const{latitude:r,longitude:d}=t.coords;fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${r}&lon=${d}&accept-language=en`).then((t=>t.json())).then((t=>{console.table(t.address),o.classList.remove("is-hidden"),e.textContent="Доброго вечора! Очікуйте на повістку за адресою:",function(t){const{house_number:e,road:o,borough:r,city:d,municipality:c,district:i,state:s,postcode:a,country:h,country_code:l}=t;n.innerHTML=`\n  <table>\n    <tr>\n      <th>Index</th>\n      <td>${a}</td>\n    </tr>\n    <tr>\n      <th>Country</th>\n      <td>${h}</td>\n    </tr>\n    <tr>\n      <th>Country code</th>\n      <td>${l}</td>\n    </tr>\n    <tr>\n      <th>House number</th>\n      <td>${e}</td>\n    </tr>\n    <tr>\n      <th>Road</th>\n      <td>${o}</td>\n    </tr>\n    <tr>\n      <th>Borough</th>\n      <td>${r}</td>\n    </tr>\n    <tr>\n      <th>City</th>\n      <td>${d}</td>\n    </tr>\n    <tr>\n      <th>Municipality</th>\n      <td>${c}</td>\n    </tr>\n    <tr>\n      <th>district</th>\n      <td>${i}</td>\n    </tr>\n    <tr>\n      <th>State</th>\n      <td>${s}</td>\n    </tr>\n  </table>`}(t.address)})).catch((t=>{console.log(t),console.log("Error fetching data from API")}))}))})),o.addEventListener("click",(function(){t.classList.add("is-hidden"),o.classList.add("is-hidden"),e.innerHTML="Що ж ви мовчали про застуду , тепер ви зняті з військового обліку, всього найкращого!",n.innerHTML=""}));
//# sourceMappingURL=04-location.f459888e.js.map