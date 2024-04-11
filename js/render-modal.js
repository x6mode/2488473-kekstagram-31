
const COMMENT_STEP = 5;

const bigPicModal = document.querySelector('.big-picture');
const commentsModal = document.querySelector('.social__comments');

const commentCount = document.querySelector('.social__comment-shown-count');
const commentCountMax = document.querySelector('.social__comment-total-count');
const commentLoader = document.querySelector('.comments-loader');

const modalPic = document.querySelector('.big-picture__img').getElementsByTagName('img')[0];
const socialCaption = document.querySelector('.social__caption');

let currentIndex = 0;
let globalPicList = {};
let globalIndex = 0;


const onKeydownCancel = (e) => {
  if (e.code === 'Escape') {
    onClickCancel();
  }
};

function onClickCancel () {
  currentIndex = 0;
  commentLoader.removeEventListener('click', onClickLoader);
  document.removeEventListener('keydown', onKeydownCancel);
  bigPicModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

const getCountComment = () => document.querySelectorAll('.social__comment').length;

const generateComment = (slicedArray, index) => {
  for (const comment of slicedArray[index]) {
    const elemComment = document.createElement('li');
    elemComment.classList.add('social__comment');
    const imgComment = document.createElement('img');
    imgComment.classList.add('social__picture');
    imgComment.src = comment.avatar;
    imgComment.alt = comment.name;
    imgComment.width = '35';
    imgComment.height = '35';
    elemComment.appendChild(imgComment);

    const textComment = document.createElement('p');
    textComment.classList.add('social__text');
    textComment.textContent = comment.message;
    elemComment.appendChild(textComment);

    commentsModal.appendChild(elemComment);
  }
};

const hideLoader = () => {
  commentLoader.classList.add('hidden');
};

const showLoader = () => {
  commentLoader.classList.remove('hidden');
};

const setCurrentCommentInt = () => {
  commentCount.textContent = document.querySelectorAll('.social__comment').length;
};

const setMaxComment = (integer) => {
  commentCountMax.textContent = integer;
};

const sliceComment = (array) => {
  let currentSlice = 0;
  const outputArray = [];
  for (let i = 1; i <= Math.ceil(array.length / COMMENT_STEP); i++) {
    outputArray.push(array.slice(currentSlice, currentSlice + COMMENT_STEP));
    currentSlice += COMMENT_STEP;
  }
  return outputArray;
};

const setModalPicSrc = (evt) => {
  const result = evt.target.src.split('/').slice(-2);
  return `${result[0]}/${result[1]}`;
};

const setModalCaption = (value) => {
  socialCaption.textContent = value;
};

function onClickLoader () {
  const slicedArray = sliceComment(globalPicList[globalIndex].comments);
  try {
    generateComment(slicedArray, currentIndex);
    currentIndex++;
    commentCount.text = `${getCountComment()}`;
    setCurrentCommentInt();

    if (currentIndex === slicedArray.length) {
      hideLoader();
    }
  } catch (err) {
    hideLoader();
  }
}

const loadModalListener = (picList) => {
  globalPicList = picList;
  const picMini = document.querySelectorAll('.picture');
  commentCount.text = `${getCountComment()}`;
  for (const [index, item] of picMini.entries()) {
    item.addEventListener('click', (evt) => {
      commentsModal.innerHTML = '';
      showLoader();
      bigPicModal.classList.remove('hidden');
      modalPic.src = setModalPicSrc(evt);
      setModalCaption(picList[index].description);
      document.querySelector('.likes-count').textContent = item.querySelector('.picture__likes').textContent;
      setCurrentCommentInt();
      setMaxComment(item.querySelector('.picture__comments').textContent);

      const slicedArray = sliceComment(picList[index].comments);
      generateComment(slicedArray, currentIndex);
      currentIndex++;
      commentCount.text = `${getCountComment()}`;

      document.body.classList.add('modal-open');

      globalIndex = index;
      commentLoader.addEventListener('click', onClickLoader);

      const picCancel = document.querySelector('#picture-cancel');

      picCancel.addEventListener('click', onClickCancel);
      document.addEventListener('keydown', onKeydownCancel);
      setCurrentCommentInt();

      if (picList[index].comments.length <= COMMENT_STEP) {
        hideLoader();
      }
    });
  }
};

export { loadModalListener };
