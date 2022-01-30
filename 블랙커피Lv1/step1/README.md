## 🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

- [ ] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
  - [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
  - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.
- [ ] 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
  - [ ] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용한다.
- [ ] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
  - [ ] 메뉴 삭제시 브라우저에서 제공하는 `confirm` 인터페이스를 활용한다.
- [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
- 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.

```html
<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${name}</span>
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
</li>
```

## step1에 대한 회고

- 기능 구현 사항을 먼저 정리함으로 인해 구현해야 할 부분의 전체 상황을 한 눈에 파악하기 쉬웠다.
- 역할에 따라 함수나 변수를 모으는 것은 이전에도 했지만 길게 늘어뜨려진 함수들을 접어서 관리하니 한 눈에 파악하기 더 쉬웠다.
- 주어진 요구사항을 따라 치는 것이 아니라 직접 해보고 더 개선한 부분을 스스로 찾아서 정리하는 게 더 도움된 것 같다.(submit 이벤트에 대한 event delegation, 수정과 삭제 버튼 클릭시 event 객체보단 특정 target을 넘겨주는게 함수가 알아야 할 범위에 더 맞다고 생각되어 수정)
