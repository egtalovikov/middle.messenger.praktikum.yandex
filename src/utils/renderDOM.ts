import Block from "../services/Block";

export default function render(query: string, component: Block) {

	const root = document.querySelector(query);

	if(root)
		root.appendChild(component.getContent());

	component.dispatchComponentDidMount();

	return root;
}
