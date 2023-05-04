import Index from "../layout/index";

export default function render(query: string, component: Index) {

	const root = document.querySelector(query);

	if(root)
		root.appendChild(component.getContent());

	component.dispatchComponentDidMount();

	return root;
}
