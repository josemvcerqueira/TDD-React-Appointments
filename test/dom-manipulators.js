import ReactDOM from 'react-dom';

export const createContainer = (dom = ReactDOM) => {
  const container = document.createElement('div');

  return {
    render: component => dom.render(component, container),
    container
  };
};
