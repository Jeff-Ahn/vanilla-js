// TODO localStorage Read & Write
// - [x] 데이터가 변할 때마다 localStorage에 데이터를 저장한다.
//  - [x] 메뉴를 추가할 때
//  - [x] 메뉴를 수정할 때
//  - [x] 메뉴를 삭제할 때
// - [x] 처음 페이지 로드시 로컬 스토리지에서 데이터를 load하여 새로고침해도 데이터가 남아있게 한다.

// TODO 카테고리별 메뉴판 관리
// - [x] 에스프레소 메뉴판 관리
// - [x] 프라푸치노 메뉴판 관리
// - [x] 블렌디드 메뉴판 관리
// - [x] 티바나 메뉴판 관리
// - [x] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [x] 페이지에 최초로 접근할 때는 localStorage에서 에스프레소 메뉴를 불러온다.
// - [x] 불러온 에스프레소 메뉴를 페이지에 그린다.

// TODO 품절 상태 관리
// - [x] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가한다.
// - [x] 품절 버튼 클릭시 localStorage에 상태가 저장된다.
// - [x] 클릭이벤트에서 가장 가까운 span tag에 `sold-out` class를 추가한다.
import { $ } from '../utils/dom.js';
import store from '../store/index.js';

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListeners();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map(
        (
          { name, soldOut },
          index
        ) => `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name ${
                  soldOut ? 'sold-out' : ''
                }">${name}</span>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                >
                  품절
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                  수정
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                  삭제
                </button>
            </li>`
      )
      .join('');
    $('#menu-list').innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    const newMenuName = $('#menu-name').value;
    if (newMenuName === '') {
      alert('값을 입력해주세요.');
      return;
    }
    this.menu[this.currentCategory].push({ name: newMenuName });
    store.setLocalStorage(this.menu);
    render();
    $('#menu-name').value = '';
  };

  const editMenuName = ($target) => {
    const { menuId } = $target.closest('li').dataset;
    const $menuName = $target.closest('li').querySelector('.menu-name');
    const editedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = editedMenuName;
    store.setLocalStorage(this.menu);
    render();
  };

  const removeMenuItem = ($target) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const { menuId } = $target.closest('li').dataset;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };

  const soldOutMenu = ($target) => {
    const { menuId } = $target.closest('li').dataset;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  const initEventListeners = () => {
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
      addMenuName();
    });

    $('#menu-submit-button').addEventListener('click', addMenuName);

    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        editMenuName(e.target);
        return;
      }
      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuItem(e.target);
        return;
      }
      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e.target);
        return;
      }
    });

    $('nav').addEventListener('click', (e) => {
      const isCategoryButton =
        e.target.classList.contains('cafe-category-name');
      if (isCategoryButton) {
        const { categoryName } = e.target.dataset;
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
    });
  };
}

const app = new App();
app.init();
