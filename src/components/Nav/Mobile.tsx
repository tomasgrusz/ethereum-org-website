import { RefObject } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { IconType } from "react-icons"
import { BsTranslate } from "react-icons/bs"
import { MdBrightness2, MdSearch, MdWbSunny } from "react-icons/md"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  ButtonProps,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  MenuButton,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"

import { Button } from "@/components/Buttons"
import { BaseLink } from "@/components/Link"

import { SECTION_LABELS } from "@/lib/constants"

import LanguagePicker from "../LanguagePicker"

import type { Level, NavItem, NavSections } from "./types"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"

type FooterButtonProps = ButtonProps & {
  icon: IconType
}

const FooterButton = ({ icon, ...props }: FooterButtonProps) => (
  <Button
    leftIcon={<Icon as={icon} />}
    sx={{ span: { m: 0 } }}
    variant="ghost"
    flexDir="column"
    alignItems="center"
    color="body.base"
    px="1"
    {...props}
  />
)

const FooterItemText = (props: ChildOnlyProp) => (
  <Text
    fontSize="sm"
    lineHeight="base"
    fontWeight="normal"
    letterSpacing="wider"
    mt="2"
    textTransform="uppercase"
    textAlign="center"
    opacity={0.7}
    _hover={{ opacity: 1 }}
    {...props}
  />
)

const hamburgerSvg =
  "M 2 13 l 10 0 l 0 0 l 10 0 M 4 19 l 8 0 M 12 19 l 8 0 M 2 25 l 10 0 l 0 0 l 10 0"
const glyphSvg =
  "M 2 19 l 10 -14 l 0 0 l 10 14 M 2 19 l 10 7 M 12 26 l 10 -7 M 2 22 l 10 15 l 0 0 l 10 -15"

const hamburgerVariants = {
  closed: { d: hamburgerSvg, transition: { duration: 0.25 } },
  open: { d: glyphSvg, transition: { duration: 0.25 } },
}

type HamburgerProps = ButtonProps & {
  isMenuOpen: boolean
  onToggle: () => void
}

const HamburgerButton = ({
  isMenuOpen,
  onToggle,
  ...props
}: HamburgerProps) => {
  const { t } = useTranslation("common")
  return (
    <IconButton
      onClick={onToggle}
      aria-label={t("aria-toggle-search-button")}
      variant="ghost"
      isSecondary
      px={0}
      color="body.base"
      icon={
        <Icon
          viewBox="0 0 24 40"
          pointerEvents={isMenuOpen ? "none" : "auto"}
          mx={0.5}
          width={6}
          height={10}
          position="relative"
          strokeWidth="2px"
          _hover={{
            color: "primary.base",
            "& > path": {
              stroke: "primary.base",
            },
          }}
          sx={{
            "& > path": {
              stroke: "text",
              fill: "none",
            },
          }}
        >
          <motion.path
            variants={hamburgerVariants}
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
          />
        </Icon>
      }
      {...props}
    />
  )
}

const expandedPathVariants = {
  closed: {
    d: "M12 7.875V17.125",
    transition: { duration: 0.1 },
  },
  open: {
    d: "M12 12V12",
    transition: { duration: 0.1 },
  },
}

const ExpandIcon = ({ isOpen }: { isOpen: boolean }) => (
  <Icon
    viewBox="0 0 24 25"
    width={6}
    height={6}
    position="relative"
    strokeWidth="2px"
    display="inline-block"
    stroke="currentColor"
  >
    <motion.path
      variants={expandedPathVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      d="M12 7.875V17.125"
      stroke-width="2"
    />
    <path d="M7.375 12.5L16.625 12.5" stroke-width="2" />
  </Icon>
)

type LvlAccordionProps = {
  lvl: Level
  items: NavItem[]
  onToggle: () => void
}

const LvlAccordion = ({ lvl, items, onToggle }: LvlAccordionProps) => {
  const menuColors = useNavMenuColors()
  return (
    <Accordion allowToggle boxShadow="menu.accordion">
      {items.map(({ label, description, ...actions }) => {
        if ("href" in actions)
          return (
            <AccordionItem key={label}>
              <Button
                as={BaseLink}
                w="full"
                href={actions.href}
                onClick={onToggle}
                variant="ghost"
                borderRadius="none"
                borderColor={menuColors.stroke}
                justifyContent="start"
                gap="2"
                ps={(lvl + 2) * 4}
                py="4"
                _hover={{
                  color: menuColors.highlight,
                }}
              >
                <Box flex="1" textAlign="start">
                  <Text fontWeight="bold" fontSize="md" color={menuColors.body}>
                    {label}
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontSize="sm"
                    color={menuColors.lvl[lvl].subtext}
                  >
                    {description}
                  </Text>
                </Box>
              </Button>
            </AccordionItem>
          )
        return (
          <AccordionItem key={label}>
            {({ isExpanded }) => (
              <>
                <Heading
                  as={chakra[`h${lvl + 1}`]}
                  color={menuColors.body}
                  py="0"
                  borderColor={menuColors.stroke}
                >
                  <AccordionButton
                    justifyContent="start"
                    gap="2"
                    ps={lvl * 4}
                    pe="4"
                    py="4"
                  >
                    <ExpandIcon isOpen={isExpanded} />
                    <Box flex="1" textAlign="start">
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        color={menuColors.body}
                      >
                        {label}
                      </Text>
                      <Text
                        fontWeight="regular"
                        fontSize="sm"
                        color={menuColors.lvl[lvl].subtext}
                      >
                        {description}
                      </Text>
                    </Box>
                  </AccordionButton>
                </Heading>

                <AccordionPanel p="0" bg={menuColors.lvl[lvl + 1].background}>
                  <LvlAccordion
                    lvl={(lvl + 1) as Level}
                    items={actions.items}
                    onToggle={onToggle}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export type MobileNavMenuProps = ButtonProps & {
  isOpen: boolean
  onToggle: () => void
  toggleColorMode: () => void
  toggleSearch: () => void
  linkSections: NavSections
  fromPageParameter: string
  drawerContainerRef: RefObject<HTMLElement | null>
}

const MobileNavMenu = ({
  isOpen,
  onToggle,
  toggleColorMode: toggleTheme,
  toggleSearch,
  linkSections,
  fromPageParameter,
  drawerContainerRef,
  ...props
}: MobileNavMenuProps) => {
  const { t } = useTranslation("common")
  const ThemeIcon = useColorModeValue(MdBrightness2, MdWbSunny)
  const themeLabelKey = useColorModeValue("dark-mode", "light-mode")
  const isMenuOpen = !!useBreakpointValue({ base: isOpen, md: false })
  const menuColors = useNavMenuColors()

  return (
    <>
      <HamburgerButton isMenuOpen={isMenuOpen} onToggle={onToggle} {...props} />

      {/* DRAWER MENU */}
      <Drawer
        portalProps={{ containerRef: drawerContainerRef }}
        isOpen={isMenuOpen}
        onClose={onToggle}
        placement="start"
        size="md"
      >
        <DrawerOverlay onClick={onToggle} bg="modalBackground" />

        <DrawerContent bg="background.base">
          <Flex p="6" alignItems="center" justify="space-between">
            <DrawerHeader
              fontWeight="regular"
              fontSize="md"
              color="body.medium"
              textTransform="uppercase"
              p="0"
            >
              {t("site-title")}
            </DrawerHeader>
            <DrawerCloseButton
              fontSize="md"
              w="fit-content"
              p="2"
              mt="3"
              me="2"
            >
              {t("close")}
            </DrawerCloseButton>
          </Flex>

          {/* MAIN NAV CONTENTS OF MOBILE MENU */}
          <DrawerBody as="nav" p="0">
            <Accordion allowToggle>
              {SECTION_LABELS.map((key) => linkSections[key]).map(
                ({ label, items }) => (
                  <AccordionItem key={label}>
                    {({ isExpanded }) => (
                      <>
                        <Heading
                          as="h2"
                          color={menuColors.body}
                          py="0"
                          bg={
                            isExpanded
                              ? menuColors.lvl[1].background
                              : "background.base"
                          }
                          borderBottom={isExpanded ? "1px" : "none"}
                          borderColor="disabled"
                        >
                          <AccordionButton
                            justifyContent="start"
                            gap="2"
                            _hover={{ bg: "none" }}
                            py="4"
                          >
                            <ExpandIcon isOpen={isExpanded} />
                            <Box
                              as="span"
                              flex="1"
                              textAlign="start"
                              fontWeight="bold"
                              fontSize="lg"
                            >
                              {label}
                            </Box>
                          </AccordionButton>
                        </Heading>

                        <AccordionPanel p="0" bg={menuColors.lvl[2].background}>
                          <LvlAccordion
                            lvl={2 as Level}
                            items={items}
                            onToggle={onToggle}
                          />
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                )
              )}
            </Accordion>
          </DrawerBody>

          {/* FOOTER ELEMENTS: SEARCH, LIGHT/DARK, LANGUAGES */}
          <DrawerFooter
            bg="background.base"
            borderTop="1px"
            borderColor="primary.lowContrast"
            justifyContent="space-between"
            height="108px"
            px={4}
            py={0}
            mt="auto"
          >
            <Grid templateColumns="repeat(3, 1fr)" w="full">
              <FooterButton
                icon={MdSearch}
                onClick={() => {
                  // Workaround to ensure the input for the search modal can have focus
                  onToggle()
                  toggleSearch()
                }}
              >
                <FooterItemText>{t("search")}</FooterItemText>
              </FooterButton>
              <FooterButton icon={ThemeIcon} onClick={toggleTheme}>
                <FooterItemText>{t(themeLabelKey)}</FooterItemText>
              </FooterButton>
              <LanguagePicker
                hideFrom="md"
                position="fixed"
                w="calc(100vw - var(--eth-sizes-8))"
                inset="4"
                handleClose={onToggle}
                _before={{
                  content: '""',
                  position: "fixed",
                  inset: 0,
                  bg: "black",
                  opacity: 0.4,
                }} // TODO: Replace with overlay component
              >
                <MenuButton as={FooterButton} icon={BsTranslate}>
                  <FooterItemText>{t("languages")}</FooterItemText>
                </MenuButton>
              </LanguagePicker>
            </Grid>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileNavMenu
