import Block from '../services/Block.ts';

export default function render(query: string, component: Block) {
  // eslint-disable-next-line no-undef
  const root = document.querySelector(query);

  if (root) { root.appendChild(component.getContent()); }

  component.dispatchComponentDidMount();

  return root;
}
