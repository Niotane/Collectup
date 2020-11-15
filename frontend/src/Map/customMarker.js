function changeOpacity(evt) {
  evt.target.style.opacity = 0.6;
}

function changeOpacityToOne(evt) {
  evt.target.style.opacity = 1;
}

function showInfo(H, ui, domMarker, setCurrMarker) {
  console.log(domMarker.data);
  const bubble = new H.ui.InfoBubble(domMarker.data.location, {
    content: JSON.stringify(domMarker.data),
  });
  ui.addBubble(bubble);
  setCurrMarker(domMarker.data);
}

const getCustomMarker = (H, ui, setCurrMarker) => {
  const markerb64 =
    'data:image/svg;base64,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';

  const markerImg = document.createElement('img');
  markerImg.src = markerb64;

  const marker = document.createElement('div');
  marker.appendChild(markerImg);

  const domIcon = new H.map.DomIcon(marker, {
    // the function is called every time marker enters the viewport
    onAttach: function (clonedElement, domIcon, domMarker) {
      clonedElement.addEventListener('mouseover', changeOpacity);
      clonedElement.addEventListener('mouseout', changeOpacityToOne);
      clonedElement.addEventListener('click', () =>
        showInfo(H, ui, domMarker, setCurrMarker)
      );
      // console.log(domMarker);
    },
    // the function is called every time marker leaves the viewport
    onDetach: function (clonedElement, domIcon, domMarker) {
      clonedElement.removeEventListener('mouseover', changeOpacity);
      clonedElement.removeEventListener('mouseout', changeOpacityToOne);
      clonedElement.addEventListener('click', () =>
        showInfo(H, ui, domMarker, setCurrMarker)
      );
    },
  });

  return domIcon;
};

export default getCustomMarker;
