insert into Category values ('Kultur');
insert into Category values ('Sport');
insert into Category values ('Kjendis');
insert into Category values ('Nyheter');
insert into Category values ('Utenriks');


insert into User (username, password) values ('Anonym', 'anonym');
insert into User (username, password) values ('Ola Nordman', 'passord123');
insert into User (username, password) values ('Kari Nordman', 'KariErKulest');
insert into User (username, password) values ('user123', '123');
insert into User (username, password, salt) values ('katt', '*580501124011F796F4BBF4830995A4981C090589', '255 B
00000000  30 2E 36 37 35 30 36 33 30 32 30 32 34 37 30 39    0.67506302024709
00000010  33 34 00 00 00 00 00 00 00 00 00 00 00 00 00 00    34..............
00000020  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
00000030  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
00000040  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
00000050  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
00000060  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
00000070  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
00000080  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
00000090  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
000000A0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
000000B0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
000000C0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
000000D0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
000000E0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00    ................
000000F0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00       ...............
');

insert into Article (title, image, alt, category, importance, image_text, creator, text) VALUES ('Ny butikk i sentrum', 'https://images.unsplash.com/photo-1562865657-162a8fabcf28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1054&q=80', 'alt teskt', 'Kultur', 1, 'bilde beskrivelse', 1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque varius risus at egestas. Nullam mattis lacinia eros id blandit. Vivamus mattis, sapien ut fermentum auctor, felis tortor laoreet nibh, suscipit vehicula erat sem sit amet magna. Vestibulum quis nisl nibh. Ut varius aliquam purus, quis cursus ligula mattis a. Duis non enim ipsum. Vivamus in tristique ante. Phasellus quis diam vestibulum, porttitor turpis lobortis, efficitur nisi. Nulla quam nibh, pretium facilisis eros non, fringilla euismod tellus.

Fusce dictum ipsum sem, et ultrices est condimentum quis. Quisque pellentesque ac nisi eget fermentum. Fusce quis est augue. Curabitur placerat diam quis nulla iaculis sodales. Aliquam eleifend massa augue, a elementum est semper a. Vivamus feugiat porta accumsan. Nulla porta sit amet elit quis molestie. Curabitur ornare tellus lectus, ac pellentesque sapien dignissim quis. Sed id sodales odio. Fusce fringilla, nisi pellentesque commodo ornare, nisi metus fermentum neque, at mollis nisl nibh ut ligula.

Ut at dolor sagittis, suscipit odio eu, ornare quam. Donec ac nulla leo. Curabitur sodales scelerisque libero. Pellentesque aliquam convallis mollis. Pellentesque ultricies libero orci, in faucibus turpis laoreet id. Pellentesque eget efficitur lectus. Fusce non augue vitae tellus ultricies aliquam. Fusce mollis lacus libero, sollicitudin varius mi fringilla id. Nam pretium enim vitae massa eleifend euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque sagittis turpis nec leo lobortis, ac pellentesque risus accumsan. Proin eu fringilla lectus. Nullam nec imperdiet leo.

In at augue est. In sodales tristique odio eu condimentum. Vestibulum tempus, risus sed sodales luctus, neque turpis semper orci, non tincidunt dui urna non erat. Vivamus tristique viverra sem, vitae egestas justo tempor quis. Vivamus tincidunt nisi quis ante aliquam, nec tempor elit gravida. Ut cursus ultrices ante, ut ullamcorper massa faucibus eu. Donec at neque feugiat, feugiat nisl eu, tempus lectus. Etiam nec porta lorem. Sed venenatis et metus et imperdiet. Nam sem urna, ullamcorper eget lectus et, accumsan vehicula neque. Vestibulum lacus ligula, egestas faucibus condimentum tempor, posuere id sem. Suspendisse condimentum, mi sed hendrerit gravida, quam ex vestibulum turpis, condimentum eleifend felis odio ut odio. Donec ultricies finibus dui, eget tempus libero egestas eu.

Morbi vehicula blandit nisl. Fusce sed metus fermentum, posuere lectus quis, consectetur libero. Sed imperdiet sapien at velit viverra hendrerit. Aliquam porttitor, magna et rutrum maximus, massa justo elementum lectus, eget tincidunt eros arcu at metus. Maecenas eget rhoncus massa. Nam eu vehicula sapien, vitae gravida est. Mauris venenatis malesuada velit laoreet varius. Proin dui nulla, aliquam a maximus ut, laoreet id velit. Vestibulum felis nibh, volutpat ut tortor quis, congue laoreet neque. Aliquam a risus tellus. Integer volutpat vehicula tortor ac dapibus. Duis id nibh eu nibh sagittis ullamcorper in quis lectus. Integer ut maximus tortor, id hendrerit eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Bankran på båten', 'raneren kom seg unna', 'https://images.unsplash.com/photo-1570942872213-1242607a35eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1853&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Ny blomsterbutikk åpnes', 'fewajiowa fjiowoøa jiewo jiawfo fjwieo fjiwoa jfiow fjiw jifwo ajfiowaej fiowj fiowe fjiowe fjiowajfiow jioweajifoawjioewø jfioawø jefioawøj feioawøj fiowjeo fjweøofjwioejfiowjfiowjfioe', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'alt teskt', 'Kultur', 1,  'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Blabla', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Spennende artikkel', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('FE fiw fjfiooø', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1814&q=80', 'alt teskt', 'Kultur', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('fewfefff', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1071&q=80', 'alt teskt', 'Sport', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('lkjf fewop a', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Afew jov fewkl', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1536520872842-24a7ef829afc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'alt teskt', 'Utenriks', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nytt gulv', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'alt teskt', 'Kultur', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Tv blir lagt ned', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1484313544071-4d67c88b99be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80', 'alt teskt', 'Kultur', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('few kopf fkopf', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('pqopwq fofpw  dwffe', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1505276452202-6df1db49945a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('fwo jfoew j iø', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1486129273931-27820249c615?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'alt teskt', 'Utenriks', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1546552768-9e3a94b38a59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1531053326607-9d349096d887?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Utenriks', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1485908953667-cf6d88997642?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1020&q=80', 'alt teskt', 'Sport', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Utenriks', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1541958409-7618fd1ad26e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 1);
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1551415923-a2297c7fda79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80', 'alt teskt', 'Sport', 0, 'bilde beskrivelse', 1);

insert into Comment (text, creator, article) VALUES ('Dette var en kul artikkel', 1, 1);
insert into Comment (text, creator, article) VALUES ('Nei den var dårlig', 2, 1);
insert into Comment (text, creator, article) VALUES ('Nei den var kul', 1, 1);
insert into Comment (text, creator, article) VALUES ('Dårlig', 2, 1);
insert into Comment (text, creator, article) VALUES ('Nå må dere slutte å krangle', 3, 1);
insert into Comment (text, creator, article) VALUES ('DU er teit user123', 1, 1);
insert into Comment (text, creator, article) VALUES ('Heisann', 1, 3);