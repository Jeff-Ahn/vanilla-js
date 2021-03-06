// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가된다.
// - [x] 메뉴의 이름을 입력 받고 추가 버튼을 클릭시 추가된다.
// - [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [x] 수정 버튼을 클릭하면 prompt 창을 띄운다.
// - [x] prompt 창에 입력 받은 값으로 메뉴를 변경한다.

// TODO 메뉴 삭제
// - [x] 삭제 버튼 클릭시 confirm 창을 띄운다.
// - [x] 확인을 누르면 해당 메뉴를 삭제시킨다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

function App() {
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  const addEspressoMenuName = () => {
    const newMenuName = $('#espresso-menu-name').value;
    if (newMenuName === '') {
      alert('값을 입력해주세요.');
      return;
    }
    const menuItemTemplate = (espressoMenuName) =>
      `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    </li>`;
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(newMenuName)
    );
    $('#espresso-menu-name').value = '';
    updateMenuCount();
  };

  const editMenuName = ($target) => {
    const $menuName = $target.closest('li').querySelector('.menu-name');
    const editedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);
    $menuName.innerText = editedMenuName;
  };

  const removeMenuItem = ($target) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      $target.closest('li').remove();
      updateMenuCount();
    }
  };

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addEspressoMenuName();
  });

  $('#espresso-menu-submit-button').addEventListener(
    'click',
    addEspressoMenuName
  );

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      editMenuName(e.target);
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuItem(e.target);
    }
  });
}
App();
