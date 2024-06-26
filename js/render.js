
const picContainer = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictures = (picList) => {
  if (!(typeof picList === 'undefined')) {
    const picListFragment = document.createDocumentFragment();
    for (let i = 0; i <= picList.length - 1; i++) {
      const picItem = picTemplate.cloneNode(true);
      const picImg = picItem.querySelector('.picture__img');

      picImg.src = picList[i].url;
      picImg.alt = picList[i].description;
      picItem.querySelector('.picture__likes').textContent = picList[i].likes;
      picItem.querySelector('.picture__comments').textContent = picList[i].comments.length;
      picListFragment.appendChild(picItem);
    }

    picContainer.appendChild(picListFragment);
  }
};


const loadPicture = (data) => {
  createPictures(data);
};

export { loadPicture, createPictures };
