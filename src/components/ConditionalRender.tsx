type ConditionalRenderProps = {
  condition: boolean;
  children: React.ReactNode;
};
function ConditionalRender({ condition, children }: ConditionalRenderProps) {
  return (
    condition ? children : null
  );
}

export default ConditionalRender;
