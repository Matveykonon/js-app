/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://test-task/./src/styles/styles.css?");

/***/ }),

/***/ "./src/Data.js":
/*!*********************!*\
  !*** ./src/Data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Data\": () => (/* binding */ Data)\n/* harmony export */ });\nclass Data { \n\n    static async getItemsFromApi() {\n        try {\n             const response = await fetch('http://212.98.184.15:8080/users')\n             const data = await response.json()\n             return data\n         } catch (e) {\n            return console.log(e)\n         }\n    }\n\n    static async getItemById(id) {\n        try {\n            const response = await fetch('http://212.98.184.15:8080/users')\n            const data = await response.json()\n                .then(data => data.filter(item => item.id === id))\n            return data\n        } catch (e) {\n            console.log(e);\n        }\n    }\n\n    static async createNewItem(item) {\n        try {\n            const response = await fetch('http://212.98.184.15:8080/create', {\n                method: 'POST',\n                headers: {\n                    'Content-type': 'application/json',\n                },\n                body: JSON.stringify(item)\n            })\n            const data = await response.json()\n            return data\n        } catch (e) {\n            console.log(e)\n        }\n    }\n\n    static async deleteItem(id) {\n        try {\n            const response = await fetch(`http://212.98.184.15:8080/delete/${id}`, {\n                method: 'DELETE',\n            })\n            const data = await response.json()\n            return data\n        } catch (e) {\n            console.log(e);\n        }\n    }\n\n    static async updateItem(id, item) {\n        try {\n            const response = await fetch(`http://212.98.184.15:8080/edit/${id}`, {\n                method: 'POST',\n                headers: {\n                    'Content-type': 'application/json',\n                },\n                body: JSON.stringify(item)\n            })\n            const data = await response.json()\n            return data\n        } catch (e) {\n            console.log(e)\n        }\n    }\n}\n\n//# sourceURL=webpack://test-task/./src/Data.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Data */ \"./src/Data.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ \"./src/modal.js\");\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/styles.css */ \"./src/styles/styles.css\");\n\n\n\n\nwindow.addEventListener('load', getAll)\nconst addModal = (0,_modal__WEBPACK_IMPORTED_MODULE_1__.modalWindow)(\"add\")\nconst updateModal = (0,_modal__WEBPACK_IMPORTED_MODULE_1__.modalWindow)(\"update\")\nconst addForm = document.getElementById(\"form-add\")\nconst updForm = document.getElementById(\"form-update\")\n\ndocument.getElementById('add-new').addEventListener('click', addModal.open)\n\nconst table = document.getElementById(\"table\")\naddForm.addEventListener('submit', createFormHanlder)\nupdForm.addEventListener('submit', updateUserHandler)\ntable.addEventListener('click', event => {\n    event.preventDefault()\n    if (event.target.closest('.control_update')) {\n        console.log('Update ', event.target.dataset.id);\n        updateUser(event)\n    }\n    if (event.target.closest('.control_delete')) {\n        deleteUser(event.target.dataset.id)\n    }\n    if (event.target.closest('.thead_sort')) {\n        console.log(event.target.dataset.type);\n        sortUsers(event.target.dataset.type)\n    }\n})\n\nconst searchInput = document.getElementById(\"search-input\")\nconst searchButton = document.getElementById(\"search-button\")\nsearchButton.addEventListener('click', searchByName)\n\n\n// ======= Sort Functions\n\nfunction searchByName(event) {\n    event.preventDefault()\n    if(!searchInput.value) {\n        return\n    }\n    const name = searchInput.value.toLowerCase()\n    _Data__WEBPACK_IMPORTED_MODULE_0__.Data.getItemsFromApi()\n        .then(response => response.filter(item => item.Name.toLowerCase().includes(name)))\n        .then(renderList)\n\n}\n\nfunction sortUsers(tag) {\n    if (tag === 'desc') {\n        _Data__WEBPACK_IMPORTED_MODULE_0__.Data.getItemsFromApi()\n            .then(response => response.sort((a,b) => a.Description < b.Description ? -1 : 1))\n            .then(renderList)\n    }\n    if (tag === 'name') {\n        _Data__WEBPACK_IMPORTED_MODULE_0__.Data.getItemsFromApi()\n            .then(response => response.sort((a,b) => a.Name < b.Name ? -1 : 1))\n            .then(renderList)\n    }\n    if (tag === 'date') {\n        _Data__WEBPACK_IMPORTED_MODULE_0__.Data.getItemsFromApi()\n            .then(response => response.sort((a,b) => a.Date > b.Date ? -1 : 1))\n            .then(renderList)\n    }\n        \n}\n\n// ====== CRUD functions \n\nfunction updateUser(event) {\n    event.preventDefault()\n    const id = event.target.dataset.id\n    console.log(id);\n    _Data__WEBPACK_IMPORTED_MODULE_0__.Data.getItemById(+id)\n        .then(response => {\n            const item = response[0]\n            console.log(item);\n            updForm.name.value = item.Name\n            updForm.desc.value = item.Description\n            updForm.date.value = item.Date\n            updForm.dataset.id = id\n            updateModal.open()\n        })\n}\n\nfunction updateUserHandler(event){\n    event.preventDefault()\n    const obj = {\n        Name: updForm.name.value,\n        Description: updForm.desc.value,\n        Date: updForm.date.value\n    }\n    \n    _Data__WEBPACK_IMPORTED_MODULE_0__.Data.updateItem(event.target.dataset.id, obj).then(response => {\n        console.log(response)\n        updateModal.close()\n        getAll()\n    })\n}\n\nfunction createFormHanlder(event) {\n    event.preventDefault()\n    const obj = {\n        Name: addForm.name.value,\n        Description: addForm.desc.value,\n        Date: addForm.date.value\n    }\n    if (!addForm.name.value || !addForm.desc.value || !addForm.date.value) {\n        return\n    } \n    _Data__WEBPACK_IMPORTED_MODULE_0__.Data.createNewItem(obj)\n        .then(response => {\n            console.log(response)\n            addModal.close()\n            getAll()\n        })\n}\n\nfunction deleteUser(id) {\n    _Data__WEBPACK_IMPORTED_MODULE_0__.Data.deleteItem(id)\n        .then(response => {\n            console.log(response)\n            getAll()\n        })\n}\n\nfunction getAll() {\n    _Data__WEBPACK_IMPORTED_MODULE_0__.Data.getItemsFromApi()\n        .then(renderList)\n}\n\n\n// ====== Rendering\n\nfunction renderList(data) {\n    const html = data.length ?\n        data.map(card => (\n            `<tr>\n                <td>${card.Name}</td>\n                <td>${card.Description}</td>\n                <td>${card.Date}</td>\n                <td class=\"td_controlls\">\n                    <span class=\"control_update\" data-id=${card.id}>&#9998;</span>\n                    <span class=\"control_delete\" data-id=${card.id}>&#10006;</span>\n                </td>\n            </tr>`\n        ))\n        .join('') :\n        `<tr>\n            <td>Nothing</td>\n        </tr>`\n    const table = document.getElementById('table-body')\n    table.innerHTML = html\n}\n\n\n\n\n//# sourceURL=webpack://test-task/./src/index.js?");

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"modalWindow\": () => (/* binding */ modalWindow)\n/* harmony export */ });\nconst createModal = (options) => {\n    const modal = document.createElement('div')\n    modal.classList.add('modal')\n    \n    modal.insertAdjacentHTML('afterbegin', `\n    <div class=\"backdrop\">\n    <div class=\"modal-window\">\n        <form id=\"form-${options}\" class=\"modal_form\">\n        <label for=\"name\">Name</label>\n        <input type=\"text\" name=\"name\" id=\"name-${options}\">\n        <label for=\"desc\">Description</label>\n        <input type=\"text\" name=\"desc\" id=\"desc-${options}\">\n        <label for=\"data\">Data</label>\n        <input type=\"date\" name=\"date\" min=\"2000-01-01\" id=\"date-${options}\">\n        <div class=\"modal_controls\">\n            <button type=\"reset\" data-close=\"true\">Cancel</button>\n            <button id=\"submit-${options}\" type=\"submit\">Add</button>\n        </div>\n        </form>\n    </div>\n    </div>\n    `)\n    document.body.appendChild(modal)\n    return modal\n}\n\nconst modalWindow = function(options) {\n    const modal = createModal(options)\n    let closing = false\n    \n    const mod = {\n        open() {\n            !closing && modal.classList.add('open');\n            this.isOpen = true\n        },\n        close() {\n            closing = true;\n            modal.classList.remove('open');\n            modal.classList.add('hide');\n            setTimeout(() => {\n                modal.classList.remove('hide');\n                closing = false;\n            }, 200)\n        }   \n    }\n\n    modal.addEventListener('click', event => {\n        if(event.target.dataset.close) {\n            mod.close()\n        }\n    })\n\n    return mod\n}\n\n\n\n//# sourceURL=webpack://test-task/./src/modal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;