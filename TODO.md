#TODO

##General
- [x] Display wikipedia page in an Iframe or so
- [x] Random selection of pages in wikipedia
- [x] Timer that stops when goal page is reached
- [x] Set-up a server to hide the Iframe behavior and track user journey
- [ ] Graph of pages gone through
- [ ] Graphviz
- [x] Leaderboard
- [ ] Add a db
- [ ] Options to manually set the start and goal pages
- [ ] Number of click mode
- [x] Number of pages opened mode
- [x] User profiles or at least anonymous sessions
- [ ] Online room set up with invitations
- [ ] Online room set up with randoms
- [ ] Add difficulty levels

##Anti-cheat
- [ ] Think about and find a solution to prevent javascript/html injection (Maybe check for no jump of links with api that gives links to the page)
- [x] Think about and find a solution to prevent false timer with javascript/html injection
- [x] Add user sessions


#TOFIX
- [x] pages with redirection won't count as goal if hit from redirect url
- [x] some character still seem to pose parsing/URL problems
- [x] Disable caching in iframe
- [ ] Remove previous page options on game start (clear iframe history)
- [ ] Put one session per tab to prevent multiple tabs to interfere with another
- [ ] Check if page is orphaned


