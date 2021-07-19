import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { setRickCharacter, setMortyCharacter, rickSelector, mortySelector } from 'src/app/reducers/group';
import { setPage } from 'src/app/reducers/page';
import { searchFieldSelector } from 'src/app/reducers/search';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any[] = [];
  loading = true;
  error: any;
  public results: any[] = [];
  info: number = 0;
  rick: any;
  morty: any;

  characterName: string = '';
  currPage = 1
  nextPage = 2;
  prevPage = 0;

  constructor(
    private store: Store,
    private apollo: Apollo
  ) {
  }

  ngOnInit(): void {
    this.store.select(searchFieldSelector).subscribe((state: any) => {
      this.characterName = state;
      this.currPage = 1;

      this.apollo
        .watchQuery({
          query: gql`
            {
              characters(
                filter:{
                  name: "${this.characterName}",
                },
                page: ${this.currPage}
                ) {
                  info {
                    count
                    next
                    prev
                  }
                  results {
                    id
                    name
                    status
                    species
                    type
                    gender
                    origin {
                      name
                    }
                    image
                  }
              }
            }
          `,
          errorPolicy: 'all'
        })
        .valueChanges.subscribe((result: any) => {
          this.loading = result.loading;
          this.error = result.errors;
          this.data = result?.data;
          this.results = result?.data?.characters?.results;
          this.info = result?.data?.characters?.info;
          this.currPage = this.nextPage;
          this.nextPage = result?.data?.characters?.info.next;
          this.prevPage = result?.data?.characters?.info.prev;
        });
    });

    this.store.select(rickSelector).subscribe((rick: any) => {
      this.rick = rick;
    })

    this.store.select(mortySelector).subscribe((morty: any) => {
      this.morty = morty;
    })
  }

  onClick(): void {
    this.store.dispatch(setPage())
  }

  onNextPage(): void {
    if (this.nextPage) {
      this.currPage = this.nextPage
    }

    this.apollo
      .watchQuery({
        query: gql`
          {
            characters(
              filter:{
                name: "${this.characterName}",
              },
              page: ${this.currPage}
              ) {
                info {
                  count
                  next
                  prev
                }
                results {
                  id
                  name
                  status
                  species
                  type
                  gender
                  origin {
                    name
                  }
                  image
                }
            }
          }
        `,
        errorPolicy: 'all'
      })
      .valueChanges.subscribe((result: any) => {
        this.loading = result.loading;
        this.error = result.errors;
        this.data = result?.data;
        this.results = result?.data?.characters?.results;
        this.info = result?.data?.characters?.info;
        this.currPage = this.nextPage;
        this.nextPage = result?.data?.characters?.info.next;
        this.prevPage = result?.data?.characters?.info.prev;
      });

    return
  }

  onPrevPage(): void {
    if (this.prevPage) {
      this.currPage = this.prevPage
    }

    this.apollo
      .watchQuery({
        query: gql`
          {
            characters(
              filter:{
                name: "${this.characterName}",
              },
              page: ${this.currPage}
              ) {
                info {
                  count
                  next
                  prev
                }
                results {
                  id
                  name
                  status
                  species
                  type
                  gender
                  origin {
                    name
                  }
                  image
                }
            }
          }
        `,
        errorPolicy: 'all'
      })
      .valueChanges.subscribe((result: any) => {
        this.loading = result.loading;
        this.error = result.errors;
        this.data = result?.data;
        this.results = result?.data?.characters?.results;
        this.info = result?.data?.characters?.info;
        this.currPage = this.nextPage;
        this.nextPage = result?.data?.characters?.info.next;
        this.prevPage = result?.data?.characters?.info.prev;
      });
    return
  }

  onClickCharacter(character: any) {
    if (character) {
      if (character.name.toLowerCase().includes('rick')) {
        this.store.dispatch(setRickCharacter(character))
      }
      if (character.name.toLowerCase().includes('morty')) {
        this.store.dispatch(setMortyCharacter(character))
      }
    }
  }

}
