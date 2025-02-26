class NavigationBar {
    constructor(options = {}) {
        this.containerId = options.containerId;
        this.backgroundColor = options.backgroundColor || 'var(--nav-background-color)';
        this.backdropFilter = options.backdropFilter || 'var(--nav-backdrop-filter)';
        this.fontFamily = options.fontFamily || 'var(--font-family)';
        this.fontSize = options.fontSize || 'var(--font-size)';
        this.menuWidth = options.menuWidth || 'var(--menu-width)';
        this.menuHeight = options.menuHeight || 'var(--menu-height)';
        this.outlineColor = options.outlineColor || 'var(--nav-outline-color)';
        this.tooltipColor = options.tooltipColor || 'var(--nav-tooltip-color)';
        this.menuItems = options.menuItems || [];
    
        if (this.containerId && document.getElementById(this.containerId)) {
            this.initialize();
        } else {
            console.warn(`Elemento con id '${this.containerId}' no encontrado en el DOM.`);
        }
    }
    
    initialize() {
        document.addEventListener('DOMContentLoaded', () => {
            let barraNavegacion = document.getElementById('barraNavegacion');
            if (!barraNavegacion) {
                barraNavegacion = document.createElement('nav');
                barraNavegacion.id = 'barraNavegacion';
                document.body.appendChild(barraNavegacion);
            }
            
            let barraUl = barraNavegacion.querySelector('ul');
            if (!barraUl) {
                barraUl = document.createElement('ul');
                barraNavegacion.appendChild(barraUl);
            }

            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.fontFamily = this.fontFamily;
            document.body.style.fontSize = this.fontSize;
            document.documentElement.style.height = '100%';
            document.body.style.height = '100%';
            document.body.style.margin = '0';
            document.body.style.overflow = 'hidden';

            const outlineBox = document.createElement('div');
            outlineBox.style.position = 'absolute';
            outlineBox.style.borderRadius = '10px';
            outlineBox.style.pointerEvents = 'none';
            outlineBox.style.border = `1px solid ${this.outlineColor}`;
            outlineBox.style.transition = 'all 0.3s ease';
            outlineBox.style.opacity = '0';
            barraNavegacion.appendChild(outlineBox);

            barraNavegacion.style.position = 'fixed';
            barraNavegacion.style.bottom = '0';
            barraNavegacion.style.left = '50%';
            barraNavegacion.style.transform = 'translateX(-50%)';
            barraNavegacion.style.display = 'flex';
            barraNavegacion.style.justifyContent = 'center';
            barraNavegacion.style.alignItems = 'center';
            barraNavegacion.style.height = 'auto';

            barraUl.style.display = 'flex';
            barraUl.style.justifyContent = 'center';
            barraUl.style.alignItems = 'center';
            barraUl.style.gap = '15px';
            barraUl.style.width = this.menuWidth;
            barraUl.style.height = this.menuHeight;
            barraUl.style.outline = `1px solid ${this.outlineColor}`;
            barraUl.style.outlineOffset = '3px';
            barraUl.style.backgroundColor = this.backgroundColor;
            barraUl.style.borderRadius = '10px';
            barraUl.style.padding = '10px';
            barraUl.style.backdropFilter = this.backdropFilter;
            barraUl.style.position = 'relative';

            this.menuItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.text;
                li.style.position = 'relative';
                if (item.link) {
                    const a = document.createElement('a');
                    a.href = item.link;
                    a.textContent = item.text;
                    li.appendChild(a);
                }
                barraUl.appendChild(li);
            });

            const listItems = document.querySelectorAll('#barraNavegacion ul li');

            function positionOutlineBox(item) {
                let itemRect = item.getBoundingClientRect();
                let navRect = barraNavegacion.getBoundingClientRect();

                outlineBox.style.width = `${itemRect.width}px`;
                outlineBox.style.height = `${itemRect.height}px`;
                outlineBox.style.left = `${itemRect.left - navRect.left + itemRect.width / 2}px`;
                outlineBox.style.top = `${itemRect.top - navRect.top + itemRect.height / 2}px`;
                outlineBox.style.padding = '7px';
                outlineBox.style.transform = 'translate(-50%, -50%)';
            }

            function createTooltip(item) {
                const tooltip = document.createElement('div');
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                tooltip.style.color = 'white';
                tooltip.style.width = '90px';
                tooltip.style.height = 'auto';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.visibility = 'hidden';
                tooltip.style.transition = 'opacity 0.3s ease';
                tooltip.style.fontSize = '12px';
                tooltip.style.bottom = '100%';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.marginBottom = '18px';

                tooltip.textContent = 'Tooltip de ' + item.textContent;
                item.appendChild(tooltip);

                item.addEventListener('mouseenter', function() {
                    tooltip.style.visibility = 'visible';
                    tooltip.style.opacity = '1';
                });

                item.addEventListener('mouseleave', function() {
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                });
            }
            
            listItems.forEach(createTooltip);

            if (listItems.length > 0) {
                let firstItem = listItems[0];
                firstItem.style.position = 'relative';
                positionOutlineBox(firstItem);
            }

            listItems.forEach(function (item) {
                item.style.listStyleType = 'none';
                item.style.position = 'relative';
                item.style.transition = 'all 0.3s ease';

                item.addEventListener('mouseenter', function () {
                    item.style.cursor = 'pointer';
                    item.style.transform = 'scale(1.03)';
                    positionOutlineBox(item);
                    outlineBox.style.opacity = '1';
                });

                item.addEventListener('mouseleave', function () {
                    item.style.transform = 'scale(1)';
                    positionOutlineBox(listItems[0]);
                    outlineBox.style.opacity = '0';
                });
            });

            function contractMenu() {
                const contractLogoRight = document.createElement('div');
                contractLogoRight.classList.add('contractLogoRight');
                contractLogoRight.innerHTML = '<';
                contractLogoRight.style.color = 'black';
                contractLogoRight.style.position = 'absolute';
                contractLogoRight.style.top = '50%';
                contractLogoRight.style.right = '1%';
                contractLogoRight.style.transform = 'translateY(-50%)';
                contractLogoRight.style.fontSize = '24px';
                contractLogoRight.style.cursor = 'pointer';
                contractLogoRight.style.display = 'none';
                barraUl.appendChild(contractLogoRight);

                const contractLogoLeft = document.createElement('div');
                contractLogoLeft.classList.add('contractLogoLeft');
                contractLogoLeft.innerHTML = '>';
                contractLogoLeft.style.color = 'black';
                contractLogoLeft.style.position = 'absolute';
                contractLogoLeft.style.top = '50%';
                contractLogoLeft.style.left = '1%';
                contractLogoLeft.style.transform = 'translateY(-50%)';
                contractLogoLeft.style.fontSize = '24px';
                contractLogoLeft.style.cursor = 'pointer';
                contractLogoLeft.style.display = 'none';
                barraUl.appendChild(contractLogoLeft);

                let originalListItems = Array.from(barraUl.children).map(li => ({
                    html: li.outerHTML,
                    checkbox: li.querySelector('input[type="checkbox"]')
                }));

                let isContracted = false;
                let originalWidth = barraUl.offsetWidth;

                function positionOutlineBox(item) {
                    let itemRect = item.getBoundingClientRect();
                    let navRect = barraNavegacion.getBoundingClientRect();

                    outlineBox.style.width = `${itemRect.width}px`;
                    outlineBox.style.height = `${itemRect.height}px`;
                    outlineBox.style.left = `${itemRect.left - navRect.left + itemRect.width / 2}px`;
                    outlineBox.style.top = `${itemRect.top - navRect.top + itemRect.height / 2}px`;
                    outlineBox.style.padding = '7px';
                    outlineBox.style.transform = 'translate(-50%, -50%)';
                }

                function assignEvents() {
                    const listItems = document.querySelectorAll('#barraNavegacion ul li');

                    listItems.forEach(item => {
                        item.style.listStyleType = 'none';
                        item.style.position = 'relative';
                        item.style.transition = 'all 0.3s ease';

                        item.addEventListener('mouseenter', function () {
                            item.style.cursor = 'pointer';
                            item.style.transform = 'scale(1.03)';
                            positionOutlineBox(item);
                            outlineBox.style.opacity = '1';
                        });

                        item.addEventListener('mouseleave', function () {
                            item.style.transform = 'scale(1)';
                            outlineBox.style.opacity = '0';
                        });
                    });

                    if (listItems.length > 0) {
                        positionOutlineBox(listItems[0]);
                    }
                }

                function toggleNavItems() {
                    const expandItem = document.querySelector('#expandItem');

                    if (isContracted) {
                        barraUl.style.transition = 'width 0.3s ease';
                        barraUl.style.width = `${originalWidth}px`;
                        barraUl.innerHTML = '';

                        originalListItems.forEach(itemData => {
                            const li = document.createElement('li');
                            li.innerHTML = itemData.html;
                            barraUl.appendChild(li);

                            if (itemData.checkbox) {
                                li.appendChild(itemData.checkbox);
                            }
                        });

                        assignEvents();
                        contractLogoRight.style.display = 'block';
                        contractLogoLeft.style.display = 'block';
                        isContracted = false;

                        if (expandItem) {
                            barraUl.removeChild(expandItem);
                        }
                    } else {
                        barraUl.style.transition = 'width 0.3s ease';
                        const expandItemWidth = 100;
                        barraUl.style.width = `${expandItemWidth}px`;
                        barraUl.innerHTML = '';

                        const expandItem = document.createElement('li');
                        expandItem.id = 'expandItem';
                        expandItem.style.listStyleType = 'none';
                        const span = document.createElement('span');
                        span.style.position = 'absolute';
                        span.style.top = '50%';
                        span.style.left = '0';
                        span.style.width = '0';
                        span.style.height = '2px';
                        span.style.backgroundColor = 'black';
                        span.style.transition = 'width 0.3s ease';
                        expandItem.appendChild(span);
                        expandItem.innerHTML = 'Expandir';
                        expandItem.style.position = 'relative';
                        barraUl.appendChild(expandItem);

                        const dots = document.createElement('div');
                        dots.innerHTML = '…';
                        dots.style.fontSize = '30px';
                        dots.style.position = 'absolute';
                        dots.style.left = '50%';
                        dots.style.top = '20%';
                        dots.style.transform = 'translateX(-50%)';
                        dots.style.cursor = 'pointer';
                        dots.style.margin = '0px';
                        expandItem.appendChild(dots);

                        expandItem.addEventListener('click', toggleNavItems);

                        expandItem.addEventListener('mouseenter', function () {
                            span.style.width = '100%';
                        });

                        expandItem.addEventListener('mouseleave', function () {
                            span.style.width = '0';
                        });

                        contractLogoRight.style.display = 'none';
                        contractLogoLeft.style.display = 'none';
                        isContracted = true;
                        outlineBox.style.opacity = '0';
                    }
                }

                contractLogoRight.addEventListener('click', toggleNavItems);
                contractLogoLeft.addEventListener('click', toggleNavItems);

                barraUl.addEventListener('mouseenter', function () {
                    if (!isContracted) {
                        contractLogoRight.style.display = 'block';
                        contractLogoLeft.style.display = 'block';
                    }
                });

                barraUl.addEventListener('mouseleave', function () {
                    if (!isContracted) {
                        if (!contractLogoRight.matches(':hover') && !contractLogoLeft.matches(':hover')) {
                            contractLogoRight.style.display = 'none';
                            contractLogoLeft.style.display = 'none';
                        }
                    }
                });

                assignEvents();
            }

            function toggleColorMode() {
                const colorToggleButton = document.createElement('div');
                colorToggleButton.id = 'colorToggleButton'
                colorToggleButton.style.position = 'absolute';
                colorToggleButton.style.bottom = '10px';
                colorToggleButton.style.left = '10px';
                colorToggleButton.style.width = '40px';
                colorToggleButton.style.height = '40px';
                colorToggleButton.style.borderRadius = '50%';
                colorToggleButton.style.display = 'flex';
                colorToggleButton.style.justifyContent = 'center';
                colorToggleButton.style.alignItems = 'center';
                colorToggleButton.style.cursor = 'pointer';
                colorToggleButton.style.backgroundColor = 'rgb(0, 0, 0)';
                colorToggleButton.style.color = 'black';
                colorToggleButton.innerHTML = '🌙';
                document.body.appendChild(colorToggleButton);

                document.body.classList.add('dark-mode');

                colorToggleButton.addEventListener('click', function () {
                    if (document.body.classList.contains('dark-mode')) {
                        document.body.classList.remove('dark-mode');
                        document.body.classList.add('light-mode');
                        colorToggleButton.innerHTML = '☀️';
                        colorToggleButton.style.backgroundColor = 'white';
                        document.body.style.color = 'white';
                        document.body.style.backgroundColor = '#001524';
                        barraUl.style.outline = '1px solid white';
                        barraUl.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        outlineBox.style.border = '1px solid white';

                        const contractLogoLeft = document.querySelector('.contractLogoLeft');
                        const contractLogoRight = document.querySelector('.contractLogoRight');
                        if (contractLogoLeft && contractLogoRight) {
                            contractLogoLeft.style.color = 'white';
                            contractLogoRight.style.color = 'white';
                        }
                    } else {
                        document.body.classList.remove('light-mode');
                        document.body.classList.add('dark-mode');
                        colorToggleButton.innerHTML = '🌙';
                        colorToggleButton.style.backgroundColor = 'black';
                        document.body.style.color = 'black';
                        document.body.style.backgroundColor = 'white';
                        barraUl.style.outline = '1px solid black';
                        barraUl.style.backgroundColor = 'rgba(25, 25, 25, 0.2)';
                        outlineBox.style.border = '1px solid black';

                        const contractLogoLeft = document.querySelector('.contractLogoLeft');
                        const contractLogoRight = document.querySelector('.contractLogoRight');
                        if (contractLogoLeft && contractLogoRight) {
                            contractLogoLeft.style.color = 'black';
                            contractLogoRight.style.color = 'black';
                        }
                    }
                });
            }

            function createMenuIcon() {
                const menuIcon = document.createElement('div');
                menuIcon.id = 'menuIcon'
                menuIcon.style.position = 'absolute';
                menuIcon.style.bottom = '10px';
                menuIcon.style.left = '60px';
                menuIcon.style.width = '40px';
                menuIcon.style.height = '40px';
                menuIcon.style.borderRadius = '50%';
                menuIcon.style.display = 'flex';
                menuIcon.style.justifyContent = 'center';
                menuIcon.style.alignItems = 'center';
                menuIcon.style.cursor = 'pointer';
                menuIcon.style.backgroundColor = 'rgb(0, 0, 0)';
                menuIcon.style.color = 'white';
                menuIcon.innerHTML = '≡';
                document.body.appendChild(menuIcon);
            
                let isMenuVisible = true;
                let lateralMenu = null;
            
                menuIcon.addEventListener('click', function() {
                    const barraUl = document.querySelector('#barraNavegacion ul');
            
                    if (isMenuVisible) {
                        barraUl.style.display = 'none';
            
                        lateralMenu = document.createElement('div');
                        lateralMenu.id = 'lateralMenu'
                        lateralMenu.style.position = 'fixed';
                        lateralMenu.style.top = '0';
                        lateralMenu.style.right = '-250px';
                        lateralMenu.style.width = '200px';
                        lateralMenu.style.height = '100vh';
                        lateralMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                        lateralMenu.style.transition = 'all 0.3s ease';
                        lateralMenu.style.zIndex = '1';
                        lateralMenu.style.padding = '20px';
                        lateralMenu.style.boxSizing = 'border-box';
            
                        const lateralMenuContent = document.createElement('ul');
                        lateralMenuContent.innerHTML = barraUl.innerHTML;
                        lateralMenu.appendChild(lateralMenuContent);
            
                        const menuItems = lateralMenuContent.querySelectorAll('li');
                        menuItems.forEach(item => {
                            item.style.color = 'white';
                            item.style.marginBottom = '15px';
                            item.style.position = 'relative';
                            item.style.listStyleType = 'none';
                            item.style.transition = 'all 0.3s ease';
                            item.style.overflow = 'hidden';
                            
                            const linea = document.createElement('div');
                            linea.style.position = 'absolute';
                            linea.style.bottom = '50%';
                            linea.style.left = '0';
                            linea.style.width = '0%';
                            linea.style.height = '2px';
                            linea.style.backgroundColor = 'white';
                            linea.style.transition = 'width 0.3s ease';
                            item.appendChild(linea);
            
                            item.addEventListener('mouseenter', function () {
                                item.style.cursor = 'pointer';
                                item.style.transform = 'scale(1.03)';
                                linea.style.width = '80%';
                            });
            
                            item.addEventListener('mouseleave', function () {
                                item.style.transform = 'scale(1)';
                                linea.style.width = '0%';
                            });
                        });
            
                        const closeButton = document.createElement('div');
                        closeButton.innerHTML = '×';
                        closeButton.style.position = 'absolute';
                        closeButton.style.top = '20px';
                        closeButton.style.left = '20px';
                        closeButton.style.color = 'white';
                        closeButton.style.fontSize = '30px';
                        closeButton.style.cursor = 'pointer';
                        closeButton.addEventListener('click', function() {
                            lateralMenu.style.right = '-250px';
                            setTimeout(() => {
                                lateralMenu.remove();
                            }, 300);
                        });
            
                        lateralMenu.appendChild(closeButton);
                        document.body.appendChild(lateralMenu);
            
                        setTimeout(() => {
                            lateralMenu.style.right = '0';
                        }, 10);
                    } else {
                        if (lateralMenu) {
                            lateralMenu.style.right = '-250px';
                            setTimeout(() => {
                                lateralMenu.remove();
                            }, 300);
                        }
                    }
            
                    isMenuVisible = !isMenuVisible;
                });
            }
            
            toggleColorMode();
            contractMenu();
            createMenuIcon();
        });
    }
}