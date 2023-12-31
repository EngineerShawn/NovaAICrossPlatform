"use strict"

var fixedPlugin,
    fixedPluginButton,
    fixedPluginButtonNav,
    fixedPluginCard,
    fixedPluginCloseButton,
    navbar,
    buttonNavbarFixed,
    tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    ),
    tooltipList = tooltipTriggerList.map(function (e) {
        return new bootstrap.Tooltip(e)
    })
document.querySelector(".fixed-plugin") &&
    ((fixedPlugin = document.querySelector(".fixed-plugin")),
    (fixedPluginButton = document.querySelector(".fixed-plugin-button")),
    (fixedPluginButtonNav = document.querySelector(".fixed-plugin-button-nav")),
    (fixedPluginCard = document.querySelector(".fixed-plugin .card")),
    (fixedPluginCloseButton = document.querySelectorAll(
        ".fixed-plugin-close-button"
    )),
    (navbar = document.getElementById("navbarBlur")),
    (buttonNavbarFixed = document.getElementById("navbarFixed")),
    fixedPluginButton &&
        (fixedPluginButton.onclick = function () {
            fixedPlugin.classList.contains("show")
                ? fixedPlugin.classList.remove("show")
                : fixedPlugin.classList.add("show")
        }),
    fixedPluginButtonNav &&
        (fixedPluginButtonNav.onclick = function () {
            fixedPlugin.classList.contains("show")
                ? fixedPlugin.classList.remove("show")
                : fixedPlugin.classList.add("show")
        }),
    fixedPluginCloseButton.forEach(function (e) {
        e.onclick = function () {
            fixedPlugin.classList.remove("show")
        }
    }),
    (document.querySelector("body").onclick = function (e) {
        e.target != fixedPluginButton &&
            e.target != fixedPluginButtonNav &&
            e.target.closest(".fixed-plugin .card") != fixedPluginCard &&
            fixedPlugin.classList.remove("show")
    }),
    navbar &&
        "true" == navbar.getAttribute("navbar-scroll") &&
        buttonNavbarFixed.setAttribute("checked", "true"))
var total = document.querySelectorAll(".nav-pills")

function getEventTarget(e) {
    return (e = e || window.event).target || e.srcElement
}

function sidebarColor(e) {
    for (
        var t = e.parentElement.children,
            n = e.getAttribute("data-color"),
            i = 0;
        i < t.length;
        i++
    )
        t[i].classList.remove("active")
    e.classList.contains("active")
        ? e.classList.remove("active")
        : e.classList.add("active"),
        document.querySelector(".sidenav").setAttribute("data-color", n)
    var a = document.querySelector("#sidenavCard"),
        e = [
            "card",
            "card-background",
            "shadow-none",
            "card-background-mask-" + n,
        ]
    ;(a.className = ""), a.classList.add(...e)
    ;(e = document.querySelector("#sidenavCardIcon")),
        (n = [
            "ni",
            "ni-diamond",
            "text-gradient",
            "text-lg",
            "top-0",
            "text-" + n,
        ])
    ;(e.className = ""), e.classList.add(...n)
}

function debounce(i, a, s) {
    var l
    return function () {
        var e = this,
            t = arguments,
            n = s && !l
        clearTimeout(l),
            (l = setTimeout(function () {
                ;(l = null), s || i.apply(e, t)
            }, a)),
            n && i.apply(e, t)
    }
}

function sidebarType(e) {
    for (
        var t = e.parentElement.children,
            n = e.getAttribute("data-class"),
            i = 0;
        i < t.length;
        i++
    )
        t[i].classList.remove("active")
    e.classList.contains("active")
        ? e.classList.remove("active")
        : e.classList.add("active")
    e = document.querySelector(".sidenav")
    e.classList.remove("bg-transparent"),
        e.classList.remove("bg-white"),
        e.classList.add(n)
}

total.forEach(function (s, e) {
    var l = document.createElement("div"),
        t = s.querySelector("li:first-child .nav-link").cloneNode()
    ;(t.innerHTML = "-"),
        l.classList.add("moving-tab", "position-absolute", "nav-link"),
        l.appendChild(t),
        s.appendChild(l)
    s.getElementsByTagName("li").length
    ;(l.style.padding = "0px"),
        (l.style.width = s.querySelector("li:nth-child(1)").offsetWidth + "px"),
        (l.style.transform = "translate3d(0px, 0px, 0px)"),
        (l.style.transition = ".5s ease"),
        (s.onmouseover = function (e) {
            let t = getEventTarget(e),
                a = t.closest("li")
            if (a) {
                let n = Array.from(a.closest("ul").children),
                    i = n.indexOf(a) + 1
                s.querySelector("li:nth-child(" + i + ") .nav-link").onclick =
                    function () {
                        l = s.querySelector(".moving-tab")
                        let e = 0
                        if (s.classList.contains("flex-column")) {
                            for (var t = 1; t <= n.indexOf(a); t++)
                                e += s.querySelector(
                                    "li:nth-child(" + t + ")"
                                ).offsetHeight
                            ;(l.style.transform =
                                "translate3d(0px," + e + "px, 0px)"),
                                (l.style.height = s.querySelector(
                                    "li:nth-child(" + t + ")"
                                ).offsetHeight)
                        } else {
                            for (t = 1; t <= n.indexOf(a); t++)
                                e += s.querySelector(
                                    "li:nth-child(" + t + ")"
                                ).offsetWidth
                            ;(l.style.transform =
                                "translate3d(" + e + "px, 0px, 0px)"),
                                (l.style.width =
                                    s.querySelector("li:nth-child(" + i + ")")
                                        .offsetWidth + "px")
                        }
                    }
            }
        })
}),
    window.addEventListener("resize", function (e) {
        total.forEach(function (n, e) {
            n.querySelector(".moving-tab").remove()
            var i = document.createElement("div"),
                a = n.querySelector(".nav-link.active").cloneNode()
            ;(a.innerHTML = "-"),
                i.classList.add("moving-tab", "position-absolute", "nav-link"),
                i.appendChild(a),
                n.appendChild(i),
                (i.style.padding = "0px"),
                (i.style.transition = ".5s ease")
            let s = n.querySelector(".nav-link.active").parentElement
            if (s) {
                let e = Array.from(s.closest("ul").children)
                a = e.indexOf(s) + 1
                let t = 0
                if (n.classList.contains("flex-column")) {
                    for (var l = 1; l <= e.indexOf(s); l++)
                        t += n.querySelector(
                            "li:nth-child(" + l + ")"
                        ).offsetHeight
                    ;(i.style.transform = "translate3d(0px," + t + "px, 0px)"),
                        (i.style.width =
                            n.querySelector("li:nth-child(" + a + ")")
                                .offsetWidth + "px"),
                        (i.style.height = n.querySelector(
                            "li:nth-child(" + l + ")"
                        ).offsetHeight)
                } else {
                    for (l = 1; l <= e.indexOf(s); l++)
                        t += n.querySelector(
                            "li:nth-child(" + l + ")"
                        ).offsetWidth
                    ;(i.style.transform = "translate3d(" + t + "px, 0px, 0px)"),
                        (i.style.width =
                            n.querySelector("li:nth-child(" + a + ")")
                                .offsetWidth + "px")
                }
            }
        }),
            window.innerWidth < 991
                ? total.forEach(function (e, t) {
                      e.classList.contains("flex-column") ||
                          e.classList.add("flex-column", "on-resize")
                  })
                : total.forEach(function (e, t) {
                      e.classList.contains("on-resize") &&
                          e.classList.remove("flex-column", "on-resize")
                  })
    })
const iconNavbarSidenav = document.getElementById("iconNavbarSidenav"),
    iconSidenav = document.getElementById("iconSidenav")
let body = document.getElementsByTagName("body")[0],
    className = "g-sidenav-pinned"

function toggleSidenav() {
    const sidenav = document.getElementById("sidenav-main"),
        iconSidenav2 = document.getElementById("iconSidenav")

    if (body.classList.contains(className)) {
        body.classList.remove(className)
        setTimeout(function () {
            sidenav.classList.remove("bg-white")
        }, 100)
        sidenav.classList.remove("bg-transparent")
    } else {
        body.classList.add(className)
        sidenav.classList.add("bg-white")
        sidenav.classList.remove("bg-transparent")
        iconSidenav2.classList.remove("d-none") // little x button
    }
}

iconNavbarSidenav && iconNavbarSidenav.addEventListener("click", toggleSidenav),
    iconSidenav && iconSidenav.addEventListener("click", toggleSidenav)
let referenceButtons = document.querySelector("[data-class]")

function sidenavTypeOnResize() {
    let e = document.querySelectorAll('[onclick="sidebarType(this)"]')
    window.innerWidth < 1200
        ? e.forEach(function (e) {
              e.classList.add("disabled")
          })
        : e.forEach(function (e) {
              e.classList.remove("disabled")
          })
}

window.addEventListener("resize", sidenavTypeOnResize),
    window.addEventListener("load", sidenavTypeOnResize)
