<template>
  <div class="modal-overlay">
    <div class="modal">
      <form @submit.prevent="addPosition">
        <header>
          <div class="flex">
            <div class="companySelect mx-6">
              <h1>Firma</h1>
              <select
                v-model="company"
                class="cursor-pointer"
                name="company"
                id="company"
              >
                <option value="JKMed">JKMed</option>
                <option value="Fundacja DlaWas">Fundacja DlaWas</option>
                <option value="Kornix Wejherowo">Kornix Wejherowo</option>
              </select>
            </div>
            <div class="companySelect">
              <h1>Usługa</h1>
              <select
                v-model="service"
                class="cursor-pointer"
                name="company"
                id="company"
              >
                <option value="webApp">Aplikacja Webowa</option>
                <option value="webPage">Strona Internetowa</option>
                <option value="graphicProject">Projekt graficzny</option>
                <option value="techService">Obsługa techniczna</option>
              </select>
            </div>
          </div>
          <div @click="closeModal" class="close cursor-pointer">
            <img src="/icons/x-circle.svg" alt="" />
          </div>
        </header>
        <table>
          <tr>
            <th>Opis Usługi</th>
            <th>ilość</th>
            <th>Cena jedn. netto</th>
            <th>Rabat %</th>
            <th>Cena netto</th>
            <th>+ / -</th>
          </tr>
          <tr v-for="position in positions" :key="position">
            <td>{{ position.description }}</td>
            <td>{{ position.quantity }}</td>
            <td>{{ position.priceForOne }} PLN</td>
            <td>{{ position.discount }}%</td>
            <td>{{ position.price }} PLN</td>
            <td>
              <button><img src="/icons/minus-circle.svg" alt="" /></button>
            </td>
          </tr>
          <tr>
            <td>
              <textarea v-model="description" name="description"></textarea>
            </td>
            <td><input v-model="quantity" class="number" type="number" /></td>
            <td>
              <input v-model="priceForOne" class="number" type="number" />
            </td>
            <td>
              <input
                v-model="discount"
                class="number"
                min="0"
                max="100"
                type="number"
              />
            </td>
            <td></td>
            <td>
              <button type="submit">
                <img src="/icons/plus-circle.svg" alt="" />
              </button>
            </td>
          </tr>
        </table>
      </form>

      <footer class="summary">
        <div>
          <h1>
            Razem: <span>{{ summary }}</span> PLN
          </h1>
        </div>
        <div class="buttons">
          <button>Wyślij wycenę</button>
          <button>Dodaj Draft</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';

const company = ref(''); //All Task
const service = ref('');
let summary = ref(0);

const description = ref(''); // underTask
const quantity = ref();
const discount = ref();
const priceForOne = ref();
const price = ref();

type position = {
  description: string;
  quantity: number | null;
  discount: number | null;
  priceForOne: number | null;
  price: number | null;
};
let positions: position[] = [];

const addPosition = () => {
  positions.push({
    description: description.value,
    quantity: quantity.value,
    discount: discount.value,
    priceForOne: financial(priceForOne.value),
    price: financial(
      countPrice(discount.value, priceForOne.value, quantity.value)
    ),
  });
  summary.value += financial(
    countPrice(discount.value, priceForOne.value, quantity.value)
  );
  clearInputs();
};
const closeModal = () => {
  navigateTo('/dashboard');
  clearInputs();
};
function financial(x: any): number {
  return parseInt(Number.parseFloat(x).toFixed(2));
}
const countPrice = (
  percent: number,
  price: number,
  quantity: number
): number => {
  let summary = price * quantity;
  return summary - (percent / 100) * summary;
};

const clearInputs = () => {
  description.value = '';
  quantity.value = null;
  discount.value = null;
  priceForOne.value = null;
  price.value = null;
};

</script>

<style scoped>
.modal {
  position: absolute;
  position: fixed;
  width: 70%;
  height: 80%;
  background-color: white;
  left: calc(50% - 35%);
  top: calc(50% - 40%);
  z-index: 999;
  box-shadow: 0px 0px 33px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  padding: 1.5rem;
  transform: none;
  overflow: hidden;
}
.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
  transition: 0.3s all;
}
header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
header h1 {
  font-size: 2rem;
}
.companySelect {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
select {
  font-size: 1rem;
}
table {
  width: 100%;
}
th {
  text-align: center;
  border-bottom: 2px solid #ddd;
  padding: 0.5rem 0;
}
tr {
  text-align: center;
  border-bottom: 1px solid #ddd;
  transition: 0.3s all;
}
td {
  padding: 1rem 0;
  max-width: 300px;
}
input,
textarea {
  background-color: rgb(248, 248, 248);
  border-radius: 7px;
  text-align: center;
  border-style: inset;
  transition: 0.5s border;
  transition: 0.5s background-color;
}
input:focus,
textarea:focus {
  outline: none;
  border-style: inset;
  border: 1px #fca311 solid;
  background-color: white;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.number {
  width: 80px;
  padding: 0.3rem;
}
textarea {
  width: 100%;
}
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 5%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.summary {
}
.summary h1 {
  font-size: 2rem;
  font-weight: 600;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.buttons button {
  padding: 1rem 2rem;
  background-color: #fca311;
  border-radius: 30px;
  margin-left: 1rem;
  transition: 0.3s all;
  box-shadow: none;
}
.buttons button:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 33px rgba(0, 0, 0, 0.25);
}
.buttons button:nth-child(1) {
  color: white;
}
.buttons button:nth-child(2) {
  background-color: #ffffff;
  border: #fca311 1px solid;
}
.submit {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
