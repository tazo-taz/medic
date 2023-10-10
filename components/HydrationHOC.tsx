import { useEffect, useState } from "react";

function HydrationHOC<P extends {}>(Component: React.ComponentType<P>) {
    function InnerComponent(props: P) {
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true);
        }, []);

        if (!isMounted) {
            return null;
        }

        return <Component {...props} />;
    }

    InnerComponent.displayName = `HydrationHOC(${Component.displayName || Component.name || 'Component'})`;

    return InnerComponent;
};

export default HydrationHOC